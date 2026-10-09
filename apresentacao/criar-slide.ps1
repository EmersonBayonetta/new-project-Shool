$ErrorActionPreference = 'Stop'
$folder = $PSScriptRoot
$output = Join-Path $folder 'Trilha_Pitch.pptx'
$preview = Join-Path $folder 'Trilha_Pitch.png'

function Color([string]$hex) {
    $hex = $hex.TrimStart('#')
    return [Convert]::ToInt32($hex.Substring(0,2),16) + 256 * [Convert]::ToInt32($hex.Substring(2,2),16) + 65536 * [Convert]::ToInt32($hex.Substring(4,2),16)
}
function Box($slide, $x, $y, $w, $h, $fill, $round = $false) {
    $kind = 1
    if ($round) { $kind = 5 }
    $s = $slide.Shapes.AddShape($kind, $x, $y, $w, $h)
    $s.Fill.ForeColor.RGB = Color $fill
    $s.Line.Visible = 0
    if ($round) { $s.Adjustments.Item(1) = 0.13 }
    return $s
}
function Text($slide, $x, $y, $w, $h, $text, $size, $color, $bold = $false) {
    $s = $slide.Shapes.AddTextbox(1, $x, $y, $w, $h)
    $s.TextFrame.MarginLeft = 0
    $s.TextFrame.MarginRight = 0
    $s.TextFrame.MarginTop = 0
    $s.TextFrame.MarginBottom = 0
    $s.TextFrame.WordWrap = -1
    $r = $s.TextFrame.TextRange
    $r.Text = $text
    $r.Font.Name = 'Aptos'
    $r.Font.Size = [single]$size
    $r.Font.Color.RGB = Color $color
    $r.Font.Bold = [int]($bold) * -1
    $r.ParagraphFormat.SpaceAfter = 0
    return $s
}

$ppt = $null
$deck = $null
try {
    $ppt = New-Object -ComObject PowerPoint.Application
    $initialCount = $ppt.Presentations.Count
    $deck = $ppt.Presentations.Add(0)
    $deck.PageSetup.SlideWidth = 960
    $deck.PageSetup.SlideHeight = 540
    $slide = $deck.Slides.Add(1,12)
    $slide.FollowMasterBackground = 0
    $slide.Background.Fill.ForeColor.RGB = Color '#FAFAFD'

    Box $slide 403 0 557 540 '#F0ECFA' | Out-Null
    Box $slide 48 39 35 35 '#7660D3' $true | Out-Null
    Text $slide 51 38 31 36 '↗' 27 '#FFFFFF' $true | Out-Null
    Text $slide 93 26 240 61 'trilha.' 45 '#263047' $true | Out-Null
    Text $slide 49 94 344 20 'Prazos dispersos. Tarefas acumuladas.' 12 '#7B748C' | Out-Null

    $headline = Text $slide 48 132 344 117 "Mais do que lembrar`nprazos, ajudamos a`nconcluir cada etapa." 28 '#273047' $true
    $headline.TextFrame.TextRange.Characters(48,19).Font.Color.RGB = Color '#7660D3'
    Text $slide 49 260 324 53 'Um próximo passo claro para transformar responsabilidades em progresso.' 15 '#777B8F' | Out-Null

    $items = @(
        @{ n='01'; y=328; title='Saiba o que fazer agora'; body='Prioridades explicáveis e próximo passo.' },
        @{ n='02'; y=383; title='Avance em pequenas etapas'; body='Checklist, progresso e XP por ações reais.' },
        @{ n='03'; y=438; title='Continue mesmo sem internet'; body='Planejamento e progresso salvos localmente.' }
    )
    foreach ($item in $items) {
        Box $slide 49 $item.y 31 31 '#ECE7F9' $true | Out-Null
        $number = Text $slide 54 ($item.y+7) 23 20 $item.n 12 '#7660D3' $true
        Text $slide 93 ($item.y-1) 294 25 $item.title 15 '#273047' $true | Out-Null
        Text $slide 93 ($item.y+23) 298 24 $item.body 10.5 '#7D8093' | Out-Null
    }

    Text $slide 430 44 475 25 'SUA JORNADA ACADÊMICA, ORGANIZADA.' 12 '#7660D3' $true | Out-Null
    Text $slide 430 78 460 41 "Professor publica. Aluno executa.`nA Trilha mostra a evolução." 18 '#353047' $true | Out-Null
    Text $slide 430 126 454 18 'INTERFACE REAL · DESKTOP + MOBILE' 9 '#9687B6' $true | Out-Null

    $browser = Box $slide 423 150 489 357 '#FFFFFF' $true
    $browser.Adjustments.Item(1) = 0.035
    $browser.Line.Visible = -1
    $browser.Line.ForeColor.RGB = Color '#DFD7EF'
    Box $slide 424 151 487 18 '#FAF8FD' | Out-Null
    foreach ($x in @(434,444,454)) {
        $dot = $slide.Shapes.AddShape(9, $x,157,4,4)
        $dot.Fill.ForeColor.RGB = Color '#C8B9E3'
        $dot.Line.Visible = 0
    }
    Text $slide 540 155 267 10 'trilha · ambiente de demonstração' 6 '#968BA8' | Out-Null
    $desktop = $slide.Shapes.AddPicture((Join-Path $folder 'interface-desktop.png'),0,-1,429,173,477,328)
    $desktop.AlternativeText = 'Captura real da Trilha no desktop: próximo passo, atividades pendentes, prazos e evolução por XP.'

    $phone = Box $slide 785 224 130 276 '#2F2942' $true
    $phone.Shadow.Visible = -1
    $phone.Shadow.Transparency = 0.78
    $phone.Shadow.Blur = 14
    $phone.Shadow.OffsetX = -5
    $phone.Shadow.OffsetY = 6
    $mobile = $slide.Shapes.AddPicture((Join-Path $folder 'interface-mobile.png'),0,-1,791,238,118,255.4)
    $mobile.AlternativeText = 'Captura real da interface mobile: ação Meu próximo passo e indicadores acadêmicos.'
    Box $slide 827 229 45 3 '#70667F' $true | Out-Null

    Text $slide 49 510 340 17 'PITCH · PROTÓTIPO FUNCIONAL' 9 '#9D97AD' $true | Out-Null
    Text $slide 430 517 484 15 'Dados locais • perfis demonstrativos • sem serviços externos' 9 '#8D80A4' | Out-Null

    $speech = @'
ROTEIRO DE FALA — APROXIMADAMENTE 60 A 90 SEGUNDOS

“Os estudantes já têm agendas, calendários e grupos de mensagens, mas continuam acumulando tarefas. O problema não é apenas lembrar um prazo: é saber o que fazer agora e conseguir avançar.

A Trilha transforma cada responsabilidade em um próximo passo claro. No painel, o aluno vê quais atividades precisam de atenção e por quê. Ao abrir uma atividade, encontra pequenas etapas com tempo estimado. Cada conclusão atualiza o progresso e gera XP real, sem relação com notas.

O professor publica atividades e comunicados na mesma base demonstrativa. O aluno executa as etapas, acompanha sua evolução e pode organizar pendências em um plano de recuperação sem alterar prazos oficiais.

Como a aplicação guarda os dados localmente e tem cache PWA, o aluno pode continuar registrando progresso sem internet após a primeira visita à versão de produção.

Nossa proposta é simples: mais do que lembrar prazos, ajudamos você a concluir cada etapa.”

SUGESTÃO PARA A DEMONSTRAÇÃO AO VIVO
1. Abra Meu próximo passo.
2. Marque uma etapa e mostre progresso e XP.
3. Alterne para professor e publique uma atividade.
4. Volte ao aluno para mostrar o registro compartilhado.
5. Abra Meu planejamento e Simular offline.

TRANSPARÊNCIA
Capturas reais do aplicativo implementado. Dados fictícios. Os números da interface representam apenas o cenário demonstrativo, não resultados de pesquisa. A troca de perfis não é autenticação segura. O assistente utiliza regras locais; não há IA generativa, sincronização com servidor nem comunicação entre dispositivos. Para recarregar realmente sem rede, visite previamente a versão de produção para preparar o cache PWA.
'@
    $slide.NotesPage.Shapes.Placeholders.Item(2).TextFrame.TextRange.Text = $speech
    $deck.SaveAs($output,24)
    $slide.Export($preview,'PNG',1920,1080)
    $deck.Close()
    $deck = $null
    $verify = $ppt.Presentations.Open($output,-1,0,0)
    if ($verify.Slides.Count -ne 1) { throw 'O arquivo não possui exatamente um slide.' }
    $shapeCount = $verify.Slides.Item(1).Shapes.Count
    $verify.Close()
    Write-Output "PowerPoint validado: 1 slide, $shapeCount elementos."
    Write-Output $output
    Write-Output $preview
} finally {
    if ($null -ne $deck) { $deck.Close() }
    if ($null -ne $ppt -and $initialCount -eq 0) { $ppt.Quit() }
}



