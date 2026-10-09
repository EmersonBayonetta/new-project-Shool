$ErrorActionPreference = 'Stop'
$folder = $PSScriptRoot
$content = Get-Content -LiteralPath (Join-Path $folder 'conteudo.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$output = Join-Path $folder 'Trilha_Apresentacao_Completa.pptx'
$pdf = Join-Path $folder 'Trilha_Apresentacao_Completa.pdf'
$previewFolder = Join-Path $folder 'slides'
New-Item -ItemType Directory -Force -Path $previewFolder | Out-Null
Add-Type -AssemblyName System.Drawing

function Color([string]$hex) {
    $hex = $hex.TrimStart('#')
    return [Convert]::ToInt32($hex.Substring(0,2),16) + 256 * [Convert]::ToInt32($hex.Substring(2,2),16) + 65536 * [Convert]::ToInt32($hex.Substring(4,2),16)
}
function Box($slide, $x, $y, $w, $h, $fill, $round = $true) {
    $kind = 1; if ($round) { $kind = 5 }
    $s = $slide.Shapes.AddShape($kind, [single]$x, [single]$y, [single]$w, [single]$h)
    $s.Fill.ForeColor.RGB = Color $fill
    $s.Line.Visible = 0
    if ($round) { $s.Adjustments.Item(1) = 0.06 }
    return $s
}
function Text($slide, $x, $y, $w, $h, $text, $size, $color = '#273047', $bold = $false) {
    $s = $slide.Shapes.AddTextbox(1, [single]$x, [single]$y, [single]$w, [single]$h)
    $s.TextFrame.MarginLeft = 0; $s.TextFrame.MarginRight = 0; $s.TextFrame.MarginTop = 0; $s.TextFrame.MarginBottom = 0
    $s.TextFrame.WordWrap = -1
    $r = $s.TextFrame.TextRange; $r.Text = $text
    $r.Font.Name = 'Aptos'; $r.Font.Size = [single]$size
    $r.Font.Color.RGB = Color $color; $r.Font.Bold = [int]($bold) * -1
    $r.ParagraphFormat.SpaceAfter = 0
    return $s
}
function Picture($slide, $file, $x, $y, $maxW, $maxH, $label) {
    $path = Join-Path $folder ('telas/' + $file + '.png')
    $image = [System.Drawing.Image]::FromFile($path)
    $ratio = $image.Width / $image.Height; $image.Dispose()
    $w = $maxW; $h = $w / $ratio
    if ($h -gt $maxH) { $h = $maxH; $w = $h * $ratio }
    $px = $x + ($maxW - $w)/2; $py = $y + ($maxH - $h)/2
    Box $slide ($px-5) ($py-5) ($w+10) ($h+10) '#FFFFFF' | Out-Null
    $pic = $slide.Shapes.AddPicture($path,0,-1,[single]$px,[single]$py,[single]$w,[single]$h)
    $pic.AlternativeText = $label
    return $pic
}
function Header($slide, $item, $number) {
    $slide.FollowMasterBackground = 0; $slide.Background.Fill.ForeColor.RGB = Color '#F8F8FC'
    Box $slide 48 32 5 20 '#7660D3' $false | Out-Null
    Text $slide 64 34 805 19 $item.section 10 '#7660D3' $true | Out-Null
    Text $slide 48 70 865 74 $item.title 29 '#273047' $true | Out-Null
    Text $slide 48 143 866 38 $item.subtitle 13 '#7B7F93' | Out-Null
    Box $slide 48 506 864 1 '#E2DFEE' $false | Out-Null
    Text $slide 48 516 760 13 ('Fonte: ' + $item.source) 8 '#9690A5' | Out-Null
    Text $slide 858 513 59 16 ('{0:00} / {1:00}' -f $number,$content.Count) 10 '#7660D3' $true | Out-Null
    $slide.NotesPage.Shapes.Placeholders.Item(2).TextFrame.TextRange.Text = $item.notes + "`n`nREFERÊNCIA CONCEITUAL: Solucao_Academica_Etapas_Ajustadas.md — " + $item.source
}

$ppt = $null; $deck = $null; $initialCount = 0
$issues = New-Object System.Collections.Generic.List[string]
try {
    $ppt = New-Object -ComObject PowerPoint.Application
    $initialCount = $ppt.Presentations.Count
    $deck = $ppt.Presentations.Add(0)
    $deck.PageSetup.SlideWidth = 960; $deck.PageSetup.SlideHeight = 540
    $deck.Slides.InsertFromFile((Join-Path $folder 'Trilha_Pitch.pptx'),0,1,1) | Out-Null
    $deck.Slides.Item(1).NotesPage.Shapes.Placeholders.Item(2).TextFrame.TextRange.Text = $content[0].notes

    for ($index=1; $index -lt $content.Count; $index++) {
        $item = $content[$index]; $number = $index+1
        $slide = $deck.Slides.Add($number,12)
        Header $slide $item $number
        if ($item.type -eq 'architecture') {
            for ($i=0; $i -lt 3; $i++) {
                $x=48+$i*302
                Box $slide $x 214 260 201 '#FFFFFF' | Out-Null
                Box $slide ($x+17) 231 32 27 '#ECE6FA' | Out-Null
                Text $slide ($x+25) 234 21 19 ('0'+($i+1)) 12 '#7660D3' $true | Out-Null
                Text $slide ($x+17) 276 226 42 $item.items[$i].title 18 '#6550B5' $true | Out-Null
                Text $slide ($x+17) 329 226 76 $item.items[$i].body 13 '#626A80' | Out-Null
                if ($i -lt 2) {
                    $arrow=$slide.Shapes.AddConnector(1,[single]($x+268),[single]314,[single]($x+294),[single]314)
                    $arrow.Line.ForeColor.RGB=Color '#9B85D6'
                    $arrow.Line.Weight=2
                    $arrow.Line.EndArrowheadStyle=3
                }
            }
            Box $slide 48 433 864 60 '#EDE7FA' | Out-Null
            Text $slide 64 443 200 34 'CAMADA OFFLINE' 12 '#6550B5' $true | Out-Null
            Text $slide 266 440 627 44 $item.items[3].body 13 '#626A80' | Out-Null
        }
        elseif ($item.type -eq 'cards' -or $item.type -eq 'flow') {
            $n = $item.items.Count
            $cols=3; if ($n -eq 4) { $cols=2 }
            $rows=[Math]::Ceiling($n/$cols)
            $gap=16; $w=(864-($cols-1)*$gap)/$cols; $h=(296-($rows-1)*$gap)/$rows
            for ($i=0; $i -lt $n; $i++) {
                $x=48+($i%$cols)*($w+$gap); $y=195+[Math]::Floor($i/$cols)*($h+$gap)
                $fill='#FFFFFF'; if ($item.type -eq 'flow') { $fill='#EFEAF9' }
                Box $slide $x $y $w $h $fill | Out-Null
                $titleSize=17; $bodySize=14; if ($rows -eq 1) { $titleSize=19; $bodySize=16 }
                Text $slide ($x+18) ($y+19) ($w-36) 48 $item.items[$i].title $titleSize '#6550B5' $true | Out-Null
                Text $slide ($x+18) ($y+72) ($w-36) ($h-86) $item.items[$i].body $bodySize '#626A80' | Out-Null
                if ($item.type -eq 'flow' -and ($i%$cols) -lt ($cols-1) -and $i -lt ($n-1)) {
                    $arrow=$slide.Shapes.AddConnector(1,[single]($x+$w+2),[single]($y+$h/2),[single]($x+$w+$gap-2),[single]($y+$h/2))
                    $arrow.Line.ForeColor.RGB=Color '#9B85D6'; $arrow.Line.Weight=1.5; $arrow.Line.EndArrowheadStyle=3
                }
            }
        }
        elseif ($item.type -eq 'statement') {
            Box $slide 48 194 864 174 '#EDE7FA' | Out-Null
            Text $slide 76 219 810 123 $item.subtitle 28 '#6550B5' $true | Out-Null
            for ($i=0; $i -lt $item.items.Count; $i++) {
                $x=48+$i*294
                Text $slide $x 403 278 23 $item.items[$i].title 12 '#7660D3' $true | Out-Null
                Text $slide $x 434 278 43 $item.items[$i].body 19 '#273047' $true | Out-Null
            }
        }
        elseif ($item.type -eq 'visual') {
            for ($i=0; $i -lt $item.items.Count; $i++) {
                $y=199+$i*95
                Box $slide 48 $y 5 29 '#C7B7EB' $false | Out-Null
                Text $slide 66 ($y-2) 248 44 $item.items[$i].title 16 '#6550B5' $true | Out-Null
                Text $slide 66 ($y+38) 248 56 $item.items[$i].body 12.5 '#697187' | Out-Null
            }
            Box $slide 334 194 578 297 '#EDE8F8' | Out-Null
            if ($item.screens.Count -eq 1) {
                Picture $slide $item.screens[0].file 343 204 560 260 $item.screens[0].label | Out-Null
                Text $slide 352 472 543 19 $item.screens[0].label 9 '#8B7CA6' | Out-Null
            } else {
                if ($item.screens[0].mobile) {
                    Picture $slide $item.screens[0].file 345 205 140 258 $item.screens[0].label | Out-Null
                    Picture $slide $item.screens[1].file 502 210 394 235 $item.screens[1].label | Out-Null
                    Text $slide 345 471 150 18 $item.screens[0].label 8 '#8B7CA6' | Out-Null
                    Text $slide 502 456 394 31 $item.screens[1].label 9 '#8B7CA6' | Out-Null
                } else {
                    for ($i=0; $i -lt 2; $i++) {
                        $x=345+$i*284
                        Picture $slide $item.screens[$i].file $x 210 269 220 $item.screens[$i].label | Out-Null
                        Text $slide $x 436 267 44 $item.screens[$i].label 11 '#75668D' $true | Out-Null
                    }
                }
            }
        }
        elseif ($item.type -eq 'table') {
            Box $slide 48 191 864 24 '#7660D3' | Out-Null
            Text $slide 61 195 281 16 'IDEIA DO DOCUMENTO' 10 '#FFFFFF' $true | Out-Null
            Text $slide 363 195 535 16 'COBERTURA NO PROTÓTIPO / EVOLUÇÃO' 10 '#FFFFFF' $true | Out-Null
            for ($i=0; $i -lt $item.items.Count; $i++) {
                $y=221+$i*25
                $fill='#FFFFFF'; if ($i%2) { $fill='#F0EDF8' }
                Box $slide 48 $y 864 24 $fill $false | Out-Null
                Text $slide 61 ($y+4) 290 18 $item.items[$i].title 10.8 '#4F426D' $true | Out-Null
                Text $slide 363 ($y+4) 535 18 $item.items[$i].body 10.4 '#697187' | Out-Null
            }
        }
        Write-Output ('Montado: {0:00} · {1}' -f $number,$item.title)
    }

    # Verificação e ajuste de caixas de texto; nenhuma imagem é ligada a arquivo externo.
    foreach ($slide in $deck.Slides) {
        foreach ($shape in $slide.Shapes) {
            if ($shape.HasTextFrame -eq -1 -and $shape.TextFrame.HasText -eq -1) {
                $round=0
                while ($shape.TextFrame2.TextRange.BoundHeight -gt ($shape.Height+1) -and $round -lt 5) {
                    $fontSize = $shape.TextFrame.TextRange.Font.Size
                    if ($fontSize -le 9) { break }
                    $shape.TextFrame.TextRange.Font.Size = [single]($fontSize-0.5)
                    $round++
                }
                if ($shape.TextFrame2.TextRange.BoundHeight -gt ($shape.Height+2)) {
                    $issues.Add("Slide $($slide.SlideIndex): caixa de texto excede a altura: $($shape.TextFrame.TextRange.Text)")
                }
            }
            if (($shape.Left+$shape.Width) -gt 961 -or ($shape.Top+$shape.Height) -gt 541) {
                $issues.Add("Slide $($slide.SlideIndex): elemento fora da página.")
            }
        }
    }
    $deck.SaveAs($output,24)
    $deck.SaveAs($pdf,32)
    foreach ($slide in $deck.Slides) {
        $slide.Export((Join-Path $previewFolder ('slide-{0:00}.png' -f $slide.SlideIndex)),'PNG',1600,900)
    }
    $deck.Close(); $deck=$null
    $verify = $ppt.Presentations.Open($output,-1,0,0)
    if ($verify.Slides.Count -ne $content.Count) { throw 'Contagem de slides inválida.' }
    $notesCount=0; $pictures=0
    foreach ($slide in $verify.Slides) {
        if ($slide.NotesPage.Shapes.Placeholders.Item(2).TextFrame.TextRange.Text.Length -gt 10) { $notesCount++ }
        foreach ($shape in $slide.Shapes) { if ($shape.Type -eq 13) { $pictures++ } }
    }
    $verify.Close()
    $report=@{ slides=$content.Count; slidesWithNotes=$notesCount; embeddedPictures=$pictures; layoutIssues=@($issues); file=$output }
    $report | ConvertTo-Json -Depth 5 | Set-Content -Encoding UTF8 (Join-Path $folder 'validacao-apresentacao.json')
    Write-Output ('VALIDADO: {0} slides, {1} com notas, {2} imagens incorporadas, {3} alertas de layout.' -f $content.Count,$notesCount,$pictures,$issues.Count)
} finally {
    if ($null -ne $deck) { $deck.Close() }
    if ($null -ne $ppt -and $initialCount -eq 0) { $ppt.Quit() }
}


