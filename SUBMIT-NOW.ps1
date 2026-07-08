# Hult admissions take-home — Joshua Scotland (@RAVEN-dubgub)
# Run: right-click → Run with PowerShell (or paste in PowerShell)

Write-Host ""
Write-Host "=== TAKE-HOME READY ===" -ForegroundColor Green
Write-Host "Folder: $env:USERPROFILE\Documents\admissions-task-board-fall26"
Write-Host "Branch: admissions/raven-dubgub"
Write-Host "Tests:  npm test (4/4 pass)"
Write-Host ""

Write-Host "STEP 1 — Fork (browser opens). Click Create fork." -ForegroundColor Cyan
Start-Process "https://github.com/rogerSuperBuilderAlpha/admissions-task-board-fall26/fork"

Read-Host "Press Enter AFTER you clicked Create fork on GitHub"

Write-Host ""
Write-Host "STEP 2 — GitHub Desktop:" -ForegroundColor Cyan
Write-Host "  File → Add local repository"
Write-Host "  Path: $env:USERPROFILE\Documents\admissions-task-board-fall26"
Write-Host "  Repository → Repository settings → Remote:"
Write-Host "    https://github.com/RAVEN-dubgub/admissions-task-board-fall26.git"
Write-Host "  Branch: admissions/raven-dubgub → Push origin"
Write-Host ""

Read-Host "Press Enter AFTER push succeeded in GitHub Desktop"

Write-Host ""
Write-Host "STEP 3 — Open PR (browser opens). Paste PR-BODY.md into description." -ForegroundColor Cyan
Start-Process "https://github.com/rogerSuperBuilderAlpha/admissions-task-board-fall26/compare/main...RAVEN-dubgub:admissions-task-board-fall26:admissions/raven-dubgub?expand=1"

Write-Host "  Title: [Admissions] Fix task board — raven-dubgub"
Write-Host "  Body:  copy from PR-BODY.md in the repo folder"
Write-Host ""
Write-Host "Done. Decision within 48 hours of PR submit." -ForegroundColor Green
