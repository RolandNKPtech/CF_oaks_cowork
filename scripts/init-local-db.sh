#!/bin/bash
# Initialize local D1 database with schema and seed data.
# Uses wrangler d1 execute to run against the local SQLite simulator.
#
# Usage: bash scripts/init-local-db.sh

set -e

DB_NAME="oaks-db"

echo "=== Creating schema ==="
npx wrangler d1 execute "$DB_NAME" --local --file=drizzle/migrations/0000_unknown_human_fly.sql

echo ""
echo "=== Seeding data ==="
npx wrangler d1 execute "$DB_NAME" --local --file=drizzle/seed.sql

echo ""
echo "=== Verifying ==="
npx wrangler d1 execute "$DB_NAME" --local --command="SELECT 'gallery_cases' as tbl, COUNT(*) as cnt FROM gallery_cases UNION ALL SELECT 'forum_questions', COUNT(*) FROM forum_questions UNION ALL SELECT 'contact_submissions', COUNT(*) FROM contact_submissions UNION ALL SELECT 'reviews', COUNT(*) FROM reviews;"

echo ""
echo "=== Local D1 ready! ==="
