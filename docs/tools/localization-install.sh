#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."
npm install --ignore-scripts --no-audit --no-fund
npm --prefix docs install --ignore-scripts --no-audit --no-fund
