#!/usr/bin/env python3
"""
Batch PHP-to-Astro converter for procedure/service pages.
Extracts static HTML content from PHP pages and wraps in Astro layout.
"""

import os
import re
import sys
import html

PHP_DIR = "/sessions/ecstatic-beautiful-meitner/mnt/convert to CF/oaks_site"
ASTRO_DIR = "/sessions/ecstatic-beautiful-meitner/oaks-astro/src/pages"

# Pages already converted manually (skip these)
SKIP = {
    "index.php", "about.php", "contact-us.php", "financing.php",
    "drdanielleandry.php", "nandi-wijay-houston.php",
    # Utility/mock pages — not public
    "Mail.php", "PHPMailerLoader.php", "doctor-template.php",
    "drdanielleandry-mock.php", "homepage-mock.php", "smtp-test.php",
    "password-page.php", "houston-facelift2.php", "male-tummy-tuck-houston1.php",
    "natrelle-breast-visualizer-desktop-banner.php",
    "natrelle-breast-visualizer-mobile-banner.php",
    "cheek-augmentation.php",  # duplicate of cheek-augmentation-houston.php
    "breast-augmentation.php",  # duplicate redirect to breast-augmentation-houston
}

# Pages that use header-with-cta (procedure pages) — detected by include pattern
# Everything else uses standard header

def extract_php_var(content, var_name):
    """Extract a PHP variable value like $title = "..."; """
    # Try double quotes
    m = re.search(rf'\${var_name}\s*=\s*"([^"]*)"', content)
    if m:
        return m.group(1)
    # Try single quotes
    m = re.search(rf"\${var_name}\s*=\s*'([^']*)'", content)
    if m:
        return m.group(1)
    return ""

def clean_html(text):
    """Remove PHP tags/includes and clean up for Astro."""
    # Remove PHP blocks entirely
    text = re.sub(r'<\?php.*?\?>', '', text, flags=re.DOTALL)
    text = re.sub(r'<\?=.*?\?>', '', text, flags=re.DOTALL)
    text = re.sub(r'<\?.*?\?>', '', text, flags=re.DOTALL)

    # Convert .php links to clean URLs
    text = re.sub(r'href="(/[^"]*?)\.php([#"][^"]*?)"', r'href="\1\2"', text)
    text = re.sub(r'href="(/[^"]*?)\.php"', r'href="\1"', text)
    text = re.sub(r"href='(/[^']*?)\.php([#'][^']*?)'", r"href='\1\2'", text)
    text = re.sub(r"href='(/[^']*?)\.php'", r"href='\1'", text)

    # Remove nocontrols (not valid HTML, was in original PHP)
    text = text.replace(' nocontrols', '')

    # Fix self-closing tags for Astro (img, br, hr, input)
    text = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1 />', text)
    text = re.sub(r'<br\s*>', '<br />', text)
    text = re.sub(r'<hr\s*>', '<hr />', text)
    text = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1 />', text)

    # Fix unclosed video tags
    text = re.sub(r'<video([^>]*)>(?!\s*</video>)', r'<video\1></video>', text)

    return text

def extract_main_content(content):
    """Extract content between <main> and </main>."""
    m = re.search(r'<main[^>]*>(.*?)</main>', content, re.DOTALL)
    if m:
        return m.group(1)
    return ""

def make_description(title, filename):
    """Generate a meta description from the page title."""
    clean_title = re.sub(r'<br\s*/?>', ' ', title).strip()
    clean_title = re.sub(r'\s+', ' ', clean_title)
    city = "Houston, TX"
    if "houston" in clean_title.lower() or "Houston" in clean_title:
        return f"{clean_title} at The Oaks Plastic Surgery. Board-certified plastic surgeons offering personalized care."
    return f"{clean_title} in {city} at The Oaks Plastic Surgery. Board-certified plastic surgeons offering personalized care."

def php_to_astro(php_file):
    """Convert a single PHP file to an Astro page."""
    filename = os.path.basename(php_file)
    if filename in SKIP:
        return None

    with open(php_file, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # Extract variables
    title = extract_php_var(content, 'title')
    bg_img = extract_php_var(content, 'bg_img')
    mb = extract_php_var(content, 'mb')

    if not title:
        return None  # Skip files without a title

    # Clean HTML entities in title
    clean_title = re.sub(r'<br\s*/?>', ' ', title).strip()
    clean_title = re.sub(r'\s+', ' ', clean_title)

    # Determine slug (filename without .php)
    slug = filename.replace('.php', '')

    # Extract and clean main content
    main_content = extract_main_content(content)
    if not main_content:
        return None

    main_content = clean_html(main_content)

    # Strip leading/trailing whitespace from content
    main_content = main_content.strip()

    # Check if it uses category grids
    has_cat4 = 'category-4.php' in content
    has_cat3 = 'category-3.php' in content

    # Build imports
    imports = ['import Base from "../layouts/Base.astro";']
    if has_cat4 or has_cat3:
        imports.append('import CategoryGrid from "../components/CategoryGrid.astro";')
        cat_imports = []
        if has_cat4:
            cat_imports.append('CATEGORIES_TOP')
        if has_cat3:
            cat_imports.append('CATEGORIES_BOTTOM')
        imports.append(f'import {{ {", ".join(cat_imports)} }} from "../lib/categories";')

    # Build description
    description = make_description(title, filename)

    # Build canonical
    canonical = f"https://theoaksplasticsurgery.com/{slug}"

    # Add category grid sections to content if PHP included them
    if has_cat4 or has_cat3:
        grid_sections = ""
        if has_cat4:
            grid_sections += """
  <section>
    <div class="container-fluid">
      <div class="row">
        <CategoryGrid categories={CATEGORIES_TOP} />
      </div>
    </div>
  </section>"""
        if has_cat3:
            grid_sections += """
  <section>
    <div class="container-fluid">
      <div class="row">
        <CategoryGrid categories={CATEGORIES_BOTTOM} />
      </div>
    </div>
  </section>"""
        # Add after main content
        main_content += grid_sections

    # Escape curly braces in content that aren't Astro expressions
    # (CategoryGrid references already have proper JSX syntax)

    mb_val = mb if mb else "60"

    astro_content = f"""---
// {clean_title}
// Ported from: {filename}
export const prerender = true;

{chr(10).join(imports)}
---

<Base
  title="{clean_title} | The Oaks Plastic Surgery"
  description="{description}"
  headerTitle="{clean_title}"
  headerImage="{bg_img or '/img/header-service.png'}"
  headerMarginBottom={{{mb_val}}}
  canonical="{canonical}"
>
{main_content}
</Base>
"""

    return astro_content

def main():
    converted = 0
    skipped = 0
    errors = []

    php_files = sorted([
        os.path.join(PHP_DIR, f)
        for f in os.listdir(PHP_DIR)
        if f.endswith('.php') and not f.startswith('.')
    ])

    for php_file in php_files:
        filename = os.path.basename(php_file)

        if filename in SKIP:
            skipped += 1
            continue

        try:
            result = php_to_astro(php_file)
            if result is None:
                skipped += 1
                continue

            slug = filename.replace('.php', '')
            astro_path = os.path.join(ASTRO_DIR, f"{slug}.astro")

            # Don't overwrite manually created files
            if os.path.exists(astro_path):
                print(f"SKIP (exists): {slug}.astro")
                skipped += 1
                continue

            with open(astro_path, 'w', encoding='utf-8') as f:
                f.write(result)

            print(f"OK: {slug}.astro")
            converted += 1

        except Exception as e:
            errors.append(f"{filename}: {e}")
            print(f"ERROR: {filename}: {e}")

    print(f"\n--- Summary ---")
    print(f"Converted: {converted}")
    print(f"Skipped: {skipped}")
    print(f"Errors: {len(errors)}")
    if errors:
        for e in errors:
            print(f"  {e}")

if __name__ == '__main__':
    main()
