@echo off
echo Starting Flask React Template servers...
echo.
echo Starting Frontend (Webpack Dev Server)...
start "Frontend Server" cmd /k "npm run serve:frontend"
timeout /t 3 /nobreak >nul
echo.
echo Starting Backend (Flask Server)...
cd src\apps\backend
start "Backend Server" cmd /k "pipenv run python server.py"
cd ..\..\..
echo.
echo Both servers are starting in separate windows.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:8080
pause

