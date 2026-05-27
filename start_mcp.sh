#!/usr/bin/env bash

set -euo pipefail

APP="./apollo-mcp-server mcp-config.yaml"
proc=""

GRAPHQL_ENDPOINT="${GRAPHQL_ENDPOINT:-https://flyby-edu-router.up.railway.app/}"

generate_api_schema() {
  echo "Generating API schema from ${GRAPHQL_ENDPOINT}..."

  if ! command -v rover >/dev/null 2>&1; then
    echo "Error: 'rover' is not installed or not on PATH. Keeping existing schema.graphql." >&2
    return 1
  fi

  tmp=$(mktemp) || return 1
  if rover graph introspect "$GRAPHQL_ENDPOINT" > "$tmp" && [ -s "$tmp" ]; then
    mv "$tmp" schema.graphql
    echo "Schema updated."
  else
    echo "Introspection failed; keeping existing schema.graphql." >&2
    rm -f "$tmp"
    return 1
  fi
}

start_server() {
  echo "Starting server..."
  $APP &
  proc=$!
}

stop_server() {
  if [ -n "$proc" ]; then
    kill "$proc" 2>/dev/null || true
    sleep 0.2

    # force kill if needed
    if kill -0 "$proc" 2>/dev/null; then
      kill -9 "$proc" 2>/dev/null || true
    fi

    wait "$proc" 2>/dev/null || true
    proc=""
  fi
}

clear

# Start the first server (continue even if schema generation fails)
generate_api_schema || true
start_server

# Debounced watcher loop (Flyby watch build output only)
chokidar "apps/**/*" -t -p |
while read path; do
  echo "Change detected..."

  # debounce: wait for a quiet window
  sleep 0.2
  while read -t 0.05 more; do :; done

  stop_server

  clear

  start_server
done
