#!/usr/bin/env bash

APP="./apollo-mcp-server mcp-config.yaml"
proc=""

GRAPHQL_ENDPOINT="${GRAPHQL_ENDPOINT:-https://flyby-edu-router.up.railway.app/}"

generate_api_schema() {
  echo "Generating API schema from ${GRAPHQL_ENDPOINT}..."
  rover graph introspect "$GRAPHQL_ENDPOINT" > schema.graphql
}

start_server() {
  echo "Starting server..."
  $APP &
  proc=$!
}

stop_server() {
  if [ -n "$proc" ]; then
    kill "$proc" 2>/dev/null
    sleep 0.2

    # force kill if needed
    if kill -0 "$proc" 2>/dev/null; then
      kill -9 "$proc" 2>/dev/null
    fi

    wait "$proc" 2>/dev/null
    proc=""
  fi
}

clear

# Start the first server
generate_api_schema
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
