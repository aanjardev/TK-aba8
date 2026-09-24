param([Parameter(Mandatory=$true)][string]$BackupDirectory,[switch]$ConfirmRestore)
$ErrorActionPreference='Stop'
if(!$ConfirmRestore){throw 'Tambahkan -ConfirmRestore untuk mengonfirmasi restore destruktif.'}
$projectRoot=Split-Path -Parent $PSScriptRoot
$backup=[IO.Path]::GetFullPath($BackupDirectory)
$allowedRoot=[IO.Path]::GetFullPath((Join-Path $projectRoot 'backups'))
if(!$backup.StartsWith($allowedRoot,[StringComparison]::OrdinalIgnoreCase)){throw 'Backup harus berada di dalam folder backups project.'}
$dump=Join-Path $backup 'database.sql';if(!(Test-Path -LiteralPath $dump)){throw 'database.sql tidak ditemukan.'}
$dbLine=Get-Content -LiteralPath (Join-Path $projectRoot '.env')|Where-Object{$_ -match '^DATABASE_URL='}|Select-Object -First 1
$dbUri=[Uri]($dbLine.Substring('DATABASE_URL='.Length).Trim('"'));$database=$dbUri.AbsolutePath.TrimStart('/');$userInfo=$dbUri.UserInfo.Split(':',2);$user=[Uri]::UnescapeDataString($userInfo[0]);$password=if($userInfo.Count -gt 1){[Uri]::UnescapeDataString($userInfo[1])}else{''}
$mysql='C:\xampp\mysql\bin\mysql.exe';$env:MYSQL_PWD=$password
try{Get-Content -LiteralPath $dump -Raw|& $mysql --host=$($dbUri.Host) --port=$($dbUri.Port) --user=$user $database;if($LASTEXITCODE -ne 0){throw 'Restore database gagal.'}}finally{Remove-Item Env:MYSQL_PWD -ErrorAction SilentlyContinue}
$archive=Join-Path $backup 'uploads.zip';if(Test-Path -LiteralPath $archive){$public=Join-Path $projectRoot 'public';Expand-Archive -LiteralPath $archive -DestinationPath $public -Force}
Write-Output 'Restore selesai. Jalankan health check dan restart aplikasi.'
