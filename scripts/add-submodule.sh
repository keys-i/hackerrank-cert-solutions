#!/usr/bin/env sh
set -eu

usage() {
  echo "Usage: $0 <topic> <difficulty> <module_number> <repo_url>" >&2
}

if [ "$#" -ne 4 ]; then
  usage
  exit 64
fi

topic=$1
difficulty=$2
module_number=$3
repo_url=$4

case "$topic" in
  ""|*/*|*..*|*[!A-Za-z0-9._-]*)
    echo "Invalid topic: $topic" >&2
    exit 64
    ;;
esac

case "$difficulty" in
  ""|*/*|*..*|*[!A-Za-z0-9._-]*)
    echo "Invalid difficulty: $difficulty" >&2
    exit 64
    ;;
esac

case "$module_number" in
  ""|*[!0-9]*)
    echo "Invalid module_number: $module_number" >&2
    exit 64
    ;;
esac

path="$topic/$difficulty/$module_number"

if git config -f .gitmodules --get "submodule.$path.path" >/dev/null 2>&1; then
  echo "Submodule already configured: $path"
  exit 0
fi

if [ -e "$path" ] || git ls-files --error-unmatch "$path" >/dev/null 2>&1; then
  echo "Refusing to overwrite existing path: $path" >&2
  exit 1
fi

mkdir -p "$topic/$difficulty"
git submodule add "$repo_url" "$path"
