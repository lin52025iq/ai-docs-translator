#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
npm run build:sass
npm run build:postcss
CONTEXT=deploy-preview BRANCH=main ESLINT_SITE_NAME=zh-CN npm run build:website
