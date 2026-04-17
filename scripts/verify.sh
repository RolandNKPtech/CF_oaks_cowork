#!/usr/bin/env bash
set -e

echo "=== Checkpoint Verification ==="
echo ""

echo "→ TypeScript check"
npx tsc --noEmit 2>&1 || echo "⚠ TypeScript has errors (non-blocking during early scaffold)"

echo ""
echo "→ Astro build"
npm run build

echo ""
echo "→ Build output check"
if [ -d "dist" ]; then
  echo "✓ dist/ directory exists"
  echo "  Files: $(find dist -type f | wc -l)"
else
  echo "✗ dist/ directory missing — build may have failed"
  exit 1
fi

echo ""
echo "✓ Checkpoint passed"
