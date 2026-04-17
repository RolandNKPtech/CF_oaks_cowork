#!/usr/bin/env bash
# Creates the Better Auth tables in local D1 and seeds an initial admin user.
#
# Usage:  bash scripts/seed-admin.sh
#
# The admin user is created via the Better Auth sign-up API after
# the tables are created, then promoted to admin role directly in D1.

set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> Creating Better Auth tables in local D1..."

npx wrangler d1 execute oaks-db --local --command "
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  email_verified INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  role TEXT DEFAULT 'user',
  banned INTEGER DEFAULT 0,
  ban_reason TEXT,
  ban_expires INTEGER
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  user_id TEXT NOT NULL REFERENCES users(id),
  impersonated_by TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  access_token TEXT,
  refresh_token TEXT,
  id_token TEXT,
  access_token_expires_at INTEGER,
  refresh_token_expires_at INTEGER,
  scope TEXT,
  password TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS verifications (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER,
  updated_at INTEGER
);
"

echo "==> Auth tables created."

# Verify tables
echo "==> Verifying auth tables..."
npx wrangler d1 execute oaks-db --local --command "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('users','sessions','accounts','verifications');"

echo ""
echo "==> Auth tables ready!"
echo ""
echo "To create the admin user, start wrangler dev and then run:"
echo ""
echo '  curl -X POST http://localhost:8788/api/auth/sign-up/email \'
echo '    -H "Content-Type: application/json" \'
echo '    -d '\''{"name":"Admin","email":"admin@theoaksplasticsurgery.com","password":"ChangeMe123!"}'\'''
echo ""
echo "Then promote to admin:"
echo ""
echo '  npx wrangler d1 execute oaks-db --local --command "UPDATE users SET role='\''admin'\'' WHERE email='\''admin@theoaksplasticsurgery.com'\'';"'
echo ""
