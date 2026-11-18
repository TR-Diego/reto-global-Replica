$ErrorActionPreference = 'Stop'

$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$runDir = Join-Path $projectDir 'run'
$portFile = Join-Path $runDir 'vite-port.txt'
$url = $null
New-Item -ItemType Directory -Path $runDir -Force | Out-Null

function Test-RetoGlobalPage([int]$Port) {
  try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:$Port" -TimeoutSec 2 -UseBasicParsing
    return ($response.StatusCode -eq 200 -and $response.Content -match 'Reto Global')
  } catch {
    return $false
  }
}

function Test-PortListening([int]$Port) {
  $client = [System.Net.Sockets.TcpClient]::new()
  try {
    $attempt = $client.ConnectAsync('127.0.0.1', $Port)
    return $attempt.Wait(250) -and $client.Connected
  } catch {
    return $false
  } finally {
    $client.Dispose()
  }
}

$npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
if (-not $npmCommand) {
  $npmCommand = Get-Command npm -ErrorAction SilentlyContinue
}
if (-not $npmCommand) {
  throw 'No encuentro Node.js/npm. Instala Node.js LTS y vuelve a abrir este lanzador.'
}

if (-not (Test-Path (Join-Path $projectDir 'node_modules\vite'))) {
  Write-Host 'Preparando Reto Global (solo la primera vez)...' -ForegroundColor Cyan
  Push-Location $projectDir
  try {
    & $npmCommand.Source install
    if ($LASTEXITCODE -ne 0) { throw 'No se pudieron instalar las dependencias del juego.' }
  } finally {
    Pop-Location
  }
}

# Reutiliza el servidor de este proyecto si ya estaba iniciado.
if (Test-Path $portFile) {
  $savedPort = 0
  if ([int]::TryParse((Get-Content $portFile -Raw), [ref]$savedPort) -and (Test-RetoGlobalPage $savedPort)) {
    $url = "http://127.0.0.1:$savedPort"
  }
}

if (-not $url) {
  $port = 3000
  while ($port -le 3010 -and (Test-PortListening $port)) {
    if (Test-RetoGlobalPage $port) {
      $url = "http://127.0.0.1:$port"
      break
    }
    $port++
  }

  if (-not $url) {
    if ($port -gt 3010) { throw 'No hay un puerto libre entre 3000 y 3010 para iniciar el juego.' }

    $stdout = Join-Path $runDir 'vite.stdout.log'
    $stderr = Join-Path $runDir 'vite.stderr.log'
    $npmArgs = "/d /c npm run dev -- --host 127.0.0.1 --strictPort --port $port"
    $server = Start-Process -FilePath $env:ComSpec -ArgumentList $npmArgs `
      -WorkingDirectory $projectDir -WindowStyle Hidden -PassThru `
      -RedirectStandardOutput $stdout -RedirectStandardError $stderr

    $ready = $false
    for ($attempt = 0; $attempt -lt 30; $attempt++) {
      if (Test-RetoGlobalPage $port) { $ready = $true; break }
      if ($server.HasExited) { break }
      Start-Sleep -Seconds 1
    }
    if (-not $ready) {
      $details = if (Test-Path $stderr) { Get-Content $stderr -Tail 12 | Out-String } else { '' }
      throw "No se pudo iniciar el juego. Revisa run\vite.stderr.log. $details"
    }

    Set-Content -LiteralPath $portFile -Value $port -Encoding ascii
    $url = "http://127.0.0.1:$port"
  }
}

$browserPaths = @(
  (Join-Path $env:ProgramFiles 'Microsoft\Edge\Application\msedge.exe'),
  (Join-Path ${env:ProgramFiles(x86)} 'Microsoft\Edge\Application\msedge.exe'),
  (Join-Path $env:LOCALAPPDATA 'Microsoft\Edge\Application\msedge.exe'),
  (Join-Path $env:LOCALAPPDATA 'Google\Chrome\Application\chrome.exe')
)
$browser = $browserPaths | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1

if ($browser) {
  Start-Process -FilePath $browser -ArgumentList "--app=$url"
} else {
  Start-Process -FilePath $url
}
