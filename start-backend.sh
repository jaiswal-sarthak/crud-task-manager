#!/bin/bash
echo "Starting Backend Server..."
echo ""
cd "$(dirname "$0")"
cd src/apps/backend
pipenv run python server.py

