#!/bin/bash

echo "Starting Flask React Template servers..."
echo ""
echo "Starting Frontend (Webpack Dev Server)..."
npm run serve:frontend &
FRONTEND_PID=$!

sleep 3

echo ""
echo "Starting Backend (Flask Server)..."
cd src/apps/backend
pipenv run python server.py &
BACKEND_PID=$!
cd ../../..

echo ""
echo "Both servers are starting..."
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap "kill $FRONTEND_PID $BACKEND_PID 2>/dev/null; exit" INT TERM
wait

