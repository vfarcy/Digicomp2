param(
    [int]$Port = 8080
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "Starting local server at http://localhost:$Port ..." -ForegroundColor Cyan
Write-Host "Open: http://localhost:$Port/Digicomp%202.html" -ForegroundColor Green

Set-Location $root
npx --yes http-server . -p $Port -c-1 -o "/Digicomp%202.html"
