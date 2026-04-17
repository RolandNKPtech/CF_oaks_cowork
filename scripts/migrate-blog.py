#!/usr/bin/env python3
"""
WordPress → Astro Content Collection migration.

Reads localhost.sql, extracts published blog posts (post_type='post', post_status='publish'),
converts WordPress block markup to clean HTML/Markdown, and writes .md files
with proper frontmatter into src/content/blog/.

Usage:
    python3 scripts/migrate-blog.py
"""

import re
import os
import html

SQL_FILE = os.path.join(os.path.dirname(__file__), "..", "..", "mnt", "convert to CF", "oaks_site", "localhost.sql")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "blog")

# Fallback to project-relative path
if not os.path.exists(SQL_FILE):
    SQL_FILE = os.path.join(os.path.dirname(__file__), "..", "..", "convert to CF", "oaks_site", "localhost.sql")


def parse_sql_string(s):
    """Unescape MySQL string literal."""
    s = s.replace("\\'", "'")
    s = s.replace('\\"', '"')
    s = s.replace("\\n", "\n")
    s = s.replace("\\r", "")
    s = s.replace("\\t", "\t")
    s = s.replace("\\\\", "\\")
    return s


def extract_posts(sql_content):
    """Extract published posts from wp_posts INSERT statements."""
    posts = []

    # Find all INSERT INTO wp_posts blocks
    inserts = re.findall(r'INSERT INTO `wp_posts`[^;]+;', sql_content, re.DOTALL)

    for ins in inserts:
        vals_start = ins.find('VALUES')
        if vals_start == -1:
            continue
        vals = ins[vals_start + 6:]

        # Parse individual row tuples
        depth = 0
        current = ''
        rows_raw = []
        for ch in vals:
            if ch == '(' and depth == 0:
                depth = 1
                current = ''
            elif ch == '(':
                depth += 1
                current += ch
            elif ch == ')' and depth == 1:
                depth = 0
                rows_raw.append(current)
            elif ch == ')':
                depth -= 1
                current += ch
            elif depth > 0:
                current += ch

        for row_str in rows_raw:
            # Parse fields by splitting on commas outside quotes
            fields = []
            field = ''
            in_quote = False
            escape_next = False
            for c in row_str:
                if escape_next:
                    field += c
                    escape_next = False
                elif c == '\\':
                    field += c
                    escape_next = True
                elif c == "'" and not in_quote:
                    in_quote = True
                    field += c
                elif c == "'" and in_quote:
                    field += c
                    in_quote = False
                elif c == ',' and not in_quote:
                    fields.append(field.strip())
                    field = ''
                else:
                    field += c
            if field:
                fields.append(field.strip())

            if len(fields) < 21:
                continue

            # Column order: ID, post_author, post_date, post_date_gmt, post_content,
            # post_title, post_excerpt, post_status, comment_status, ping_status,
            # post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt,
            # post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count

            post_type = fields[20].strip("'")
            post_status = fields[7].strip("'")

            if post_type != 'post' or post_status != 'publish':
                continue

            post = {
                'id': fields[0].strip(),
                'date': parse_sql_string(fields[2].strip("'")),
                'content': parse_sql_string(fields[4].strip("'")),
                'title': parse_sql_string(fields[5].strip("'")),
                'excerpt': parse_sql_string(fields[6].strip("'")),
                'slug': parse_sql_string(fields[11].strip("'")),
                'modified': parse_sql_string(fields[14].strip("'")),
            }
            posts.append(post)

    return posts


def clean_wp_content(content):
    """Convert WordPress block markup to clean Markdown-ish HTML."""
    # Remove WordPress block comments
    content = re.sub(r'<!-- /?wp:\w+[^>]*-->\s*', '', content)

    # Convert <figure> with <img> to just the img
    content = re.sub(
        r'<figure[^>]*>\s*(<img[^>]+>)\s*(?:<figcaption[^>]*>(.*?)</figcaption>)?\s*</figure>',
        lambda m: m.group(1) + (f'\n\n*{m.group(2)}*' if m.group(2) else ''),
        content, flags=re.DOTALL
    )

    # Fix image URLs — point to blog media path
    content = content.replace(
        'https://theoaksplasticsurgery.com/blog/wp-content/uploads/',
        '/blog/images/'
    )

    # Clean up excessive whitespace
    content = re.sub(r'\n{3,}', '\n\n', content)
    content = content.strip()

    return content


def extract_featured_image(content):
    """Try to extract the first image URL as featured image."""
    match = re.search(r'<img[^>]+src="([^"]+)"', content)
    if match:
        return match.group(1)
    return None


def generate_frontmatter(post, featured_image=None):
    """Generate YAML frontmatter for the blog post."""
    title = post['title'].replace('"', '\\"')
    # Parse date
    date = post['date'].split(' ')[0] if ' ' in post['date'] else post['date']

    fm = f'---\n'
    fm += f'title: "{title}"\n'
    fm += f'slug: "{post["slug"]}"\n'
    fm += f'pubDate: {date}\n'
    if post.get('modified') and post['modified'] != post['date']:
        mod_date = post['modified'].split(' ')[0]
        fm += f'updatedDate: {mod_date}\n'
    if post.get('excerpt'):
        excerpt = post['excerpt'].replace('"', '\\"').replace('\n', ' ').strip()
        if excerpt:
            fm += f'description: "{excerpt}"\n'
    if featured_image:
        fm += f'heroImage: "{featured_image}"\n'
    fm += f'author: "The Oaks Plastic Surgery"\n'
    fm += f'---\n'
    return fm


def main():
    print(f"Reading SQL dump: {SQL_FILE}")
    if not os.path.exists(SQL_FILE):
        print(f"ERROR: SQL file not found at {SQL_FILE}")
        return

    with open(SQL_FILE, 'r', errors='replace') as f:
        sql_content = f.read()

    posts = extract_posts(sql_content)
    print(f"Found {len(posts)} published blog posts")

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for post in posts:
        featured_img = extract_featured_image(post['content'])
        cleaned = clean_wp_content(post['content'])
        frontmatter = generate_frontmatter(post, featured_img)

        filename = f"{post['slug']}.md"
        filepath = os.path.join(OUTPUT_DIR, filename)

        with open(filepath, 'w') as f:
            f.write(frontmatter)
            f.write('\n')
            f.write(cleaned)
            f.write('\n')

        print(f"  ✓ {filename} ({len(cleaned)} chars)")

    print(f"\nDone! {len(posts)} posts written to {OUTPUT_DIR}")


if __name__ == '__main__':
    main()
