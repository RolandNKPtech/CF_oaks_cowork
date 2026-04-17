#!/usr/bin/env python3
"""
MySQL dump → D1/SQLite data migration script.
Reads localhost.sql, extracts gallery_cases and forum_questions data,
outputs SQLite-compatible INSERT statements for local D1.

Splits large INSERT batches into individual rows to avoid SQLITE_TOOBIG.

Usage:
  python3 scripts/migrate-data.py > drizzle/seed.sql
"""

import re
import sys

SQL_DUMP = "/sessions/ecstatic-beautiful-meitner/mnt/convert to CF/oaks_site/localhost.sql"


def read_dump():
    with open(SQL_DUMP, "r", encoding="utf-8", errors="replace") as f:
        return f.read()


def extract_inserts(content, db_name, table_name):
    """Extract all INSERT statements for a specific database.table"""
    db_pattern = f"USE `{db_name}`;"
    parts = content.split(db_pattern)
    if len(parts) < 2:
        print(f"-- WARNING: Database {db_name} not found", file=sys.stderr)
        return []

    section = parts[1]
    next_db = section.find("CREATE DATABASE")
    if next_db > 0:
        section = section[:next_db]

    pattern = rf"INSERT INTO `{table_name}` \([^)]+\) VALUES"
    inserts = []

    for match in re.finditer(pattern, section):
        start = match.start()
        end = section.find(";\n", start)
        if end < 0:
            end = len(section)
        inserts.append(section[start:end + 1])

    return inserts


def split_insert_into_rows(insert_sql, new_table, new_columns):
    """Split a multi-row INSERT INTO ... VALUES (...),(...); into individual statements."""
    # Find the VALUES keyword
    values_idx = insert_sql.upper().find("VALUES")
    if values_idx < 0:
        return [insert_sql]

    values_part = insert_sql[values_idx + 6:].strip()
    if values_part.endswith(";"):
        values_part = values_part[:-1]

    # Parse individual row values — handle nested parens and escaped quotes
    rows = []
    depth = 0
    current = ""
    i = 0
    while i < len(values_part):
        ch = values_part[i]
        if ch == "(" and depth == 0:
            depth = 1
            current = "("
        elif ch == "(":
            depth += 1
            current += ch
        elif ch == ")" and depth == 1:
            depth = 0
            current += ")"
            rows.append(current)
            current = ""
        elif ch == ")":
            depth -= 1
            current += ch
        elif ch == "'" and depth > 0:
            # Handle quoted strings (with escaped quotes)
            current += ch
            i += 1
            while i < len(values_part):
                ch2 = values_part[i]
                current += ch2
                if ch2 == "\\" :
                    # Skip next char (escaped)
                    i += 1
                    if i < len(values_part):
                        current += values_part[i]
                elif ch2 == "'":
                    break
                i += 1
        elif depth > 0:
            current += ch
        i += 1

    # Generate individual INSERT statements
    # Convert MySQL escaping to SQLite escaping:
    #   \' → '' (SQLite uses doubled single quotes)
    #   \" → " (no need to escape double quotes in SQLite strings)
    #   \\ → \ (keep backslash escaping for actual backslashes)
    prefix = f"INSERT INTO {new_table} ({new_columns}) VALUES"
    statements = []
    for row in rows:
        # Fix MySQL-style escaping for SQLite compatibility
        # Order matters: do \\ first, then \' and \"
        fixed = row.replace("\\\\'", "''")  # \\' → '' (escaped backslash + quote)
        fixed = fixed.replace("\\'", "''")   # \' → ''
        fixed = fixed.replace('\\"', '"')    # \" → "
        statements.append(f"{prefix}\n{fixed};")

    return statements


def main():
    content = read_dump()

    print("-- D1 seed data — generated from localhost.sql")
    print("-- Each row is a separate INSERT to avoid SQLITE_TOOBIG")
    print()

    # Gallery cases from admin DB
    print("-- Gallery cases (from theoaksp_admin.patient)")
    gallery_count = 0
    admin_patient_inserts = extract_inserts(content, "theoaksp_admin", "patient")
    for ins in admin_patient_inserts:
        rows = split_insert_into_rows(
            ins,
            "gallery_cases",
            "id, name, attributes, info, sort, service, images, url, meta_title, meta_description, display_service, is_featured"
        )
        for row in rows:
            print(row)
            print()
            gallery_count += 1

    # Forum questions
    print("-- Forum questions (from theoaksp_forum.question)")
    forum_count = 0
    forum_inserts = extract_inserts(content, "theoaksp_forum", "question")
    for ins in forum_inserts:
        rows = split_insert_into_rows(
            ins,
            "forum_questions",
            "id, name, sort, email, question_subject, question, doctor, answer_subject, answer, service, images, approved, is_read, created_at"
        )
        for row in rows:
            print(row)
            print()
            forum_count += 1

    print(f"-- Migration complete: {gallery_count} gallery rows, {forum_count} forum rows")


if __name__ == "__main__":
    main()
