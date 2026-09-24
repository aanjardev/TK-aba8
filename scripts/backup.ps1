param([string]$OutputRoot = "backups")
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $projectRoot '.env'
if (!(Test-Path -LiteralPath $envFile)) { throw '.env tidak ditemukan.' }
$dbLine = Get-Content -LiteralPath $envFile | Where-Object { $_ -match '^DATABASE_URL=' } | Select-Object -First 1
if (!$dbLine) { throw 'DATABASE_URL tidak ditemukan.' }
$dbUri = [Uri]($dbLine.Substring('DATABASE_URL='.Length).Trim('"'))
$database = $dbUri.AbsolutePath.TrimStart('/')
$userInfo = $dbUri.UserInfo.Split(':',2)
$user = [Uri]::UnescapeDataString($userInfo[0])
$password = if ($userInfo.Count -gt 1) { [Uri]::UnescapeDataString($userInfo[1]) } else { '' }
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$root = [IO.Path]::GetFullPath((Join-Path $projectRoot $OutputRoot))
$target = Join-Path $root $stamp
New-Item -ItemType Directory -Path $target -Force | Out-Null
$dump = Join-Path $target 'database.sql'
$mysqldump = 'C:\xampp\mysql\bin\mysqldump.exe'
if (!(Test-Path -LiteralPath $mysqldump)) { throw 'mysqldump XAMPP tidak ditemukan.' }
$env:MYSQL_PWD = $password
try { & $mysqldump --host=$($dbUri.Host) --port=$($dbUri.Port) --user=$user --single-transaction --routines --triggers --result-file=$dump $database; if ($LASTEXITCODE -ne 0) { throw 'mysqldump gagal.' } } finally { Remove-Item Env:MYSQL_PWD -ErrorAction SilentlyContinue }
$uploads = Join-Path $projectRoot 'public\uploads'
if (Test-Path -LiteralPath $uploads) { Compress-Archive -LiteralPath $uploads -DestinationPath (Join-Path $target 'uploads.zip') }
Set-Content -LiteralPath (Join-Path $target 'manifest.json') -Value (@{createdAt=(Get-Date).ToString('o');database=$database}|ConvertTo-Json)
Write-Output "Backup selesai: $target"
