#!/usr/bin/env bash

set -eu

DIRNAME="$(dirname -- "$0")"

if [[ -f "${DIRNAME}/../.env" ]]; then
  . "${DIRNAME}/../.env"
fi

if [[ "${CI}" == "true" && -z "${CLOUDFLARE_API_TOKEN-}" ]]; then
  echo "Skipping deployment to Cloudflare Pages because credentials are not available for contributors"
  exit 0
fi

if [[ "${NODE_ENV}" == "production" ]]; then
  npx wrangler pages deploy ./dist --project-name=genshin-langdata
else
  npx wrangler pages deploy ./dist --project-name=genshin-langdata --branch="${CLOUDFLARE_PAGES_BRANCH}"
fi
