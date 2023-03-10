#!/usr/bin/env bash

set -eu

DIRNAME="$(dirname -- "$0")"

if [[ -f "${DIRNAME}/../.env" ]]; then
  . "${DIRNAME}/../.env"
fi

if [[ "${NODE_ENV}" == "production" ]]; then
  npx wrangler pages publish ./dist --project-name=genshin-langdata
else
  npx wrangler pages publish ./dist --project-name=genshin-langdata --branch="${CLOUDFLARE_PAGES_BRANCH}"
fi
