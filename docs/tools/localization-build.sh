#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
CONTEXT=deploy-preview BRANCH=main ESLINT_SITE_NAME=zh-CN npm run build
