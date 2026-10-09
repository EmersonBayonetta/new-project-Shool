$ErrorActionPreference='Stop'
$folder=$PSScriptRoot
$out=Join-Path $folder 'Trilha_Pitch_Equipe_10_Slides.pptx'
$pdf=Join-Path $folder 'Trilha_Pitch_Equipe_10_Slides.pdf'
function RGB($hex){return [Convert]::ToInt32($hex.Substring(0,2),16)+256*[Convert]::ToInt32($hex.Substring(2,2),16)+65536*[Convert]::ToInt32($hex.Substring(4,2),16)}
function Txt($slide,$x,$y,$w,$h,$text,$size,$color='273047',$bold=$false){
 $s=$slide.Shapes.AddTextbox(1,$x,$y,$w,$h)
 $s.TextFrame.MarginLeft=0;$s.TextFrame.MarginRight=0;$s.TextFrame.MarginTop=0;$s.TextFrame.MarginBottom=0
 $s.TextFrame.TextRange.Text=$text
 $s.TextFrame.TextRange.Font.Name='Aptos';$s.TextFrame.TextRange.Font.Size=[single]$size
 $s.TextFrame.TextRange.Font.Color.RGB=RGB $color;$s.TextFrame.TextRange.Font.Bold=[int]$bold*-1
 return $s
}
function Panel($slide,$x,$y,$w,$h,$color){$s=$slide.Shapes.AddShape(5,$x,$y,$w,$h);$s.Fill.ForeColor.RGB=RGB $color;$s.Line.Visible=0;$s.Adjustments.Item(1)=0.05;return $s}
$notes=@(
 'CAPA — 15 segundos. Apresentem a Trilha e a equipe: Emerson, Mhell, Adriana e Marcos Paulo. Uma plataforma para organizar a jornada acadêmica.',
 'PROBLEMA — 30 segundos. Alunos já usam agendas, calendários e grupos de mensagens, mas ainda acumulam atividades. Informações dispersas e dificuldade de planejar a execução são hipóteses a investigar, não causas comprovadas.',
 'IDEIA CENTRAL — 25 segundos. Saber o prazo não basta. A Trilha mostra o que fazer agora, como avançar e quanto falta para terminar. Explique prioridade, pequenas etapas e progresso visível.',
 'DASHBOARD — 30 segundos. Mostre a captura real. O aluno encontra prioridades explicáveis e a ação Meu próximo passo. Pendências, conclusões e XP são calculados a partir dos dados locais demonstrativos.',
 'ATIVIDADE E ETAPAS — 40 segundos. O professor publica a atividade. O aluno consulta prazo, instruções e etapas com tempo estimado. Cada etapa concluída atualiza progresso e XP; desfazer mantém os cálculos coerentes. XP não é nota.',
 'RECUPERAÇÃO — 30 segundos. Quando há pendências acumuladas, o plano organiza etapas por prazo e esforço. O aluno pode ajustar os dias de estudo, sem alterar prazos oficiais.',
 'OFFLINE — 30 segundos. IndexedDB guarda os dados e a PWA permite recarga sem rede após a primeira visita à versão de produção. Simular offline não desliga a conexão. Não há servidor nem sincronização real.',
 'ARQUITETURA — 25 segundos. React e TypeScript formam a interface. Regras locais calculam prioridade, progresso e XP. IndexedDB persiste os registros. A mesma base local conecta os perfis demonstrativos.',
 'VALOR E PRÓXIMO PASSO — 30 segundos. Retome clareza, progresso e continuidade. O protótipo é funcional; o próximo passo é validar com alunos e docentes se a organização da rotina melhora. Não há resultado educacional medido.',
 'ENCERRAMENTO — 15 segundos. Agradeçam e encerrem com a mensagem: mais do que lembrar prazos, ajudamos você a concluir cada etapa. Tempo sugerido total: 4min30s, com 30 segundos de margem para transições.'
)
$ppt=$null;$deck=$null;$initialCount=0
try{
 $ppt=New-Object -ComObject PowerPoint.Application;$initialCount=$ppt.Presentations.Count
 $deck=$ppt.Presentations.Add(0);$deck.PageSetup.SlideWidth=960;$deck.PageSetup.SlideHeight=540
 $cover=$deck.Slides.Add(1,12);$cover.FollowMasterBackground=0;$cover.Background.Fill.ForeColor.RGB=RGB 'F8F8FC'
 Panel $cover 570 0 390 540 'EDE7FA'|Out-Null
 Txt $cover 64 53 475 25 'PITCH · ACOMPANHAMENTO ACADÊMICO' 12 '7660D3' $true|Out-Null
 Txt $cover 61 115 487 101 'trilha.' 76 '273047' $true|Out-Null
 Txt $cover 64 238 467 91 'Sua jornada acadêmica, organizada.' 30 '6550B5' $true|Out-Null
 Txt $cover 64 364 430 25 'EQUIPE' 11 '7660D3' $true|Out-Null
 Txt $cover 64 402 450 61 "Emerson · Mhell`nAdriana · Marcos Paulo" 23 '273047' $true|Out-Null
 Panel $cover 628 75 269 355 'FFFFFF'|Out-Null
 Txt $cover 651 112 223 190 "Mais do que`nlembrar prazos,`najudamos a`nconcluir cada`netapa." 29 '6550B5' $true|Out-Null
 Txt $cover 651 345 223 52 'CLAREZA · PROGRESSO · CONTINUIDADE' 13 '8B7CA6' $true|Out-Null
 $source=Join-Path $folder 'Trilha_Apresentacao_Completa.pptx'
 foreach($index in @(3,6,22,23,25,14,30,37)){$deck.Slides.InsertFromFile($source,$deck.Slides.Count,$index,$index)|Out-Null}
 $end=$deck.Slides.Add(10,12);$end.FollowMasterBackground=0;$end.Background.Fill.ForeColor.RGB=RGB '7660D3'
 Txt $end 64 53 832 30 'TRILHA · SUA JORNADA, ORGANIZADA.' 14 'E7DFF8' $true|Out-Null
 Txt $end 64 158 832 102 'Obrigado!' 68 'FFFFFF' $true|Out-Null
 Txt $end 64 288 798 102 'Mais do que lembrar prazos, ajudamos você a concluir cada etapa.' 29 'FFFFFF' $true|Out-Null
 Txt $end 64 440 832 41 'Emerson · Mhell · Adriana · Marcos Paulo' 20 'E7DFF8'|Out-Null
 $issues=0
 for($i=1;$i -le 10;$i++){
  $slide=$deck.Slides.Item($i);$slide.NotesPage.Shapes.Placeholders.Item(2).TextFrame.TextRange.Text=$notes[$i-1]
  foreach($shape in $slide.Shapes){
   if($shape.HasTextFrame -eq -1 -and $shape.TextFrame.HasText -eq -1){
    if($shape.TextFrame.TextRange.Text -match '^\d{2} / 40$'){$shape.TextFrame.TextRange.Text=('{0:00} / 10' -f $i)}
    if($shape.TextFrame2.TextRange.BoundHeight -gt ($shape.Height+2)){$issues++}
   }
  }
 }
 $deck.SaveAs($out,24);$deck.SaveAs($pdf,32)
 $preview=Join-Path $folder 'pitch-equipe';New-Item -ItemType Directory -Force -Path $preview|Out-Null
 foreach($slide in $deck.Slides){$slide.Export((Join-Path $preview ('slide-{0:00}.png' -f $slide.SlideIndex)),'PNG',1600,900)}
 $deck.Close();$deck=$null
 $verify=$ppt.Presentations.Open($out,-1,0,0)
 if($verify.Slides.Count -ne 10){throw 'Contagem incorreta.'};$verify.Close()
 Write-Output "Validado: 10 slides, capa com equipe, encerramento, notas de 4min30s. Alertas de texto: $issues."
}finally{if($null -ne $deck){$deck.Close()};if($null -ne $ppt -and $initialCount -eq 0){$ppt.Quit()}}

