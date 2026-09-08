$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Install Node.js 24 LTS, reopen PowerShell, and run this script again.' }
$major = [int]((node -p 'process.versions.node').Split('.')[0])
if ($major -lt 24) { throw 'Node.js 24 or newer is required.' }
npm ci
if ($LASTEXITCODE) { exit $LASTEXITCODE }
npm --prefix studio ci
if ($LASTEXITCODE) { exit $LASTEXITCODE }
npm run build:studio
exit $LASTEXITCODE

