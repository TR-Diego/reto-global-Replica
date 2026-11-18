@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-game.ps1"
if errorlevel 1 (
  echo.
  echo No se pudo iniciar Reto Global. Revisa el mensaje anterior.
  pause
)
