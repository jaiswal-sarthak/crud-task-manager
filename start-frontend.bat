@echo off
echo Starting Frontend Server...
echo.
cd /d %~dp0
call npm run serve:frontend
pause

