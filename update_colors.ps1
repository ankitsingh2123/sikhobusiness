# Update color palette across all frontend pages
# OLD: Orange (#FF7A00, #FF9A44) → NEW: Indigo (#8B5CF6, #6D28D9)
# OLD: Dark bg (#0A0A0A, #111)   → NEW: Deep space (#07080F, #0D0E1A)

$files = Get-ChildItem -Path "src\app" -Recurse -Include "*.tsx","*.ts" |
  Where-Object { $_.FullName -notmatch "\\admin\\" -and $_.FullName -notmatch "\\api\\" }

$replacements = @(
  @{ From = '#0A0A0A';                To = '#07080F' },
  @{ From = '#0C0C0C';                To = '#07080F' },
  @{ From = 'bg-\[#111\]';            To = 'bg-[#0D0E1A]' },
  @{ From = 'bg-\[#111\/';            To = 'bg-[#07080F/' },
  @{ From = 'bg-\[#161616\]';         To = 'bg-[#0D0E1A]' },
  @{ From = 'bg-\[#1A1A1A\]';         To = 'bg-[#12141F]' },
  @{ From = 'bg-\[#1C1C1C\]';         To = 'bg-[#12141F]' },
  @{ From = 'bg-\[#2A2A2A\]';         To = 'bg-[#181A27]' },
  @{ From = '#FF7A00';                To = '#8B5CF6' },
  @{ From = '#FF9A44';                To = '#A78BFA' },
  @{ From = '#FFB68B';                To = '#C4B5FD' },
  @{ From = '#E54D00';                To = '#6D28D9' },
  @{ From = '#994700';                To = '#4C1D95' },
  @{ From = 'rgba\(255,122,0';        To = 'rgba(109,40,217' },
  @{ From = 'rgba\(255, 122, 0';      To = 'rgba(109, 40, 217' },
  @{ From = 'rgba\(255,154,68';       To = 'rgba(167,139,250' },
  @{ From = '#FFB700';                To = '#F59E0B' },
  @{ From = '#FFC837';                To = '#FCD34D' },
  @{ From = '#3CE36A';                To = '#10B981' },
  @{ From = 'text-\[#666\]';          To = 'text-[#475569]' },
  @{ From = 'text-\[#888\]';          To = 'text-[#94A3B8]' },
  @{ From = 'text-\[#999\]';          To = 'text-[#94A3B8]' },
  @{ From = 'text-\[#555\]';          To = 'text-[#475569]' },
  @{ From = 'text-gray-400';          To = 'text-[#94A3B8]' },
  @{ From = 'text-gray-500';          To = 'text-[#64748B]' },
  @{ From = 'from-\[#FF9A44\]';       To = 'from-[#8B5CF6]' },
  @{ From = 'to-\[#FF7A00\]';         To = 'to-[#6D28D9]' },
  @{ From = 'from-\[#FF7A00\]';       To = 'from-[#8B5CF6]' }
)

$updatedCount = 0

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw -Encoding UTF8
  $original = $content
  
  foreach ($r in $replacements) {
    $content = $content -replace [regex]::Escape($r.From), $r.To
  }
  # Also handle regex replacements
  $content = $content -replace 'rgba\(255,122,0', 'rgba(109,40,217'
  $content = $content -replace 'rgba\(255, 122, 0', 'rgba(109, 40, 217'
  $content = $content -replace "bg-\[#111\]", 'bg-[#0D0E1A]'
  $content = $content -replace "bg-\[#111\/", 'bg-[#07080F/'
  
  if ($content -ne $original) {
    Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
    Write-Host "✓ Updated: $($file.Name)"
    $updatedCount++
  }
}

Write-Host ""
Write-Host "Done! Updated $updatedCount files."
