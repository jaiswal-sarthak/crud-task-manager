@echo off
echo Starting Backend Server...
echo.
cd /d %~dp0
cd src\apps\backend
call pipenv run python server.py
pause

