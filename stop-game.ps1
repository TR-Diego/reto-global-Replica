$ErrorActionPreference = 'Stop'
$projectDir = (Resolve-Path (Split-Path -Parent $MyInvocation.MyCommand.Path)).Path.TrimEnd('\')

$viteProcesses = Get-CimInstance Win32_Process | Where-Object {
  $_.Name -eq 'node.exe' -and
  $_.CommandLine -match 'vite[\\/]+bin[\\/]+vite\.js' -and
  $_.CommandLine.IndexOf($projectDir, [StringComparison]::OrdinalIgnoreCase) -ge 0
}

if (-not $viteProcesses) {
  Write-Host 'Reto Global ya estaba detenido.' -ForegroundColor Yellow
  exit 0
}

foreach ($process in $viteProcesses) {
  & taskkill.exe /PID $process.ProcessId /T /F | Out-Null
}

$portFile = Join-Path $projectDir 'run\vite-port.txt'
if (Test-Path $portFile) { Remove-Item -LiteralPath $portFile -Force }
Write-Host 'Servidor de Reto Global detenido.' -ForegroundColor Green
