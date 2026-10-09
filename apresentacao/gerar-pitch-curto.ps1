$ErrorActionPreference='Stop'
$folder=$PSScriptRoot
$ppt=$null; $deck=$null; $initialCount=0
$out=Join-Path $folder 'Trilha_Pitch_5_Minutos.pptx'
$pdf=Join-Path $folder 'Trilha_Pitch_5_Minutos.pdf'
$selection=@(1,3,23,13,37)
$notes=@(
@'
SLIDE 1 — IDEIA CENTRAL — 45 SEGUNDOS
“A Trilha é uma plataforma de acompanhamento acadêmico. A nossa ideia central é simples: mais do que lembrar prazos, ajudar o aluno a concluir cada etapa. Ela reúne as responsabilidades, mostra o que fazer agora e transforma tarefas longas em ações menores. Estas são capturas reais do protótipo, em desktop e celular.”
Transição: por que precisamos dessa solução?
'@,
@'
SLIDE 2 — PROBLEMA — 55 SEGUNDOS
“Os alunos já têm agendas, calendários e grupos de mensagens. Mesmo assim, podem esquecer atividades e acumular entregas. Nossa hipótese é que informações dispersas e a dificuldade de organizar a execução atrapalham a rotina. Por isso, não basta criar outra lista de datas. Precisamos ajudar a compreender prioridades, começar e acompanhar o avanço.”
As causas são hipóteses do documento, ainda não validadas com estudantes. Não atribua atrasos automaticamente a falta de comprometimento.
Transição: como a ideia funciona na prática?
'@,
@'
SLIDE 3 — EXEMPLO REAL — 90 SEGUNDOS
“O professor publica uma atividade com prazo, instruções e etapas sugeridas. O aluno encontra a prioridade e abre a tarefa. Nesta tela, cada etapa tem uma ação concreta e uma estimativa de tempo. Ao concluir uma etapa, a porcentagem e o XP são atualizados. Se ele desfizer a conclusão, os cálculos permanecem coerentes. O progresso fica separado por aluno, enquanto a atividade é compartilhada pela turma. O XP reconhece participação; não representa nota escolar.”
Aponte o checklist e a barra de progresso na captura. Se houver tempo e aplicativo aberto, marque uma única etapa em vez de demonstrar vários módulos. O exemplo cabe dentro destes 90 segundos.
Transição: o que diferencia essa proposta?
'@,
@'
SLIDE 4 — DIFERENCIAIS — 65 SEGUNDOS
“Primeiro, a prioridade é explicável: o aluno entende o motivo da atenção, considerando prazo, esforço e etapas pendentes. Segundo, o planejamento por etapas e o plano de recuperação ajudam a retomar tarefas acumuladas sem alterar os prazos oficiais. Terceiro, o aplicativo mantém dados no navegador e permite registrar progresso com conexão limitada. A versão de produção pode ser recarregada sem internet após a preparação do cache.”
O protótipo usa regras locais, sem depender de IA externa. A simulação offline não desliga a conexão. Não há sincronização com servidor nem comunicação entre dispositivos.
Transição: qual é o próximo passo do projeto?
'@,
@'
SLIDE 5 — FECHAMENTO — 35 SEGUNDOS
“A Trilha muda o foco: de uma lista de prazos para uma jornada de execução. O protótipo já permite demonstrar publicação, etapas, progresso e continuidade local. Agora, o próximo passo é validar com estudantes e professores se essa experiência facilita a organização da rotina. Nossa mensagem é: mais do que lembrar prazos, ajudamos você a concluir cada etapa.”
Não apresente redução de atrasos como resultado comprovado. Tempo total sugerido: 4 minutos e 50 segundos, com 10 segundos de margem.
'@
)
try{
 $ppt=New-Object -ComObject PowerPoint.Application
 $initialCount=$ppt.Presentations.Count
 $deck=$ppt.Presentations.Add(0)
 $deck.PageSetup.SlideWidth=960; $deck.PageSetup.SlideHeight=540
 $source=Join-Path $folder 'Trilha_Apresentacao_Completa.pptx'
 foreach($index in $selection){$deck.Slides.InsertFromFile($source,$deck.Slides.Count,$index,$index)|Out-Null}
 for($i=1;$i -le 5;$i++){
  $slide=$deck.Slides.Item($i)
  $slide.NotesPage.Shapes.Placeholders.Item(2).TextFrame.TextRange.Text=$notes[$i-1]
  foreach($shape in $slide.Shapes){
   if($shape.HasTextFrame -eq -1 -and $shape.TextFrame.HasText -eq -1){
    $text=$shape.TextFrame.TextRange.Text
    if($text -match '^\d{2} / 40$'){$shape.TextFrame.TextRange.Text=('{0:00} / 05' -f $i)}
   }
  }
 }
 $slide=$deck.Slides.Item(4)
 foreach($shape in $slide.Shapes){
  if($shape.HasTextFrame -eq -1 -and $shape.TextFrame.HasText -eq -1){
   $text=$shape.TextFrame.TextRange.Text
   if($text -eq 'Planejamento por etapas'){$shape.TextFrame.TextRange.Text='Etapas e recuperação'}
   if($text -eq 'Transforma uma entrega longa em ações menores com estimativas de tempo.'){$shape.TextFrame.TextRange.Text='Divide trabalhos em pequenas ações e ajuda a reorganizar pendências.'}
   if($text -eq 'Plano de recuperação'){$shape.TextFrame.TextRange.Text='Continuidade offline'}
   if($text -eq 'Reorganiza pendências em dias de estudo sem alterar prazos oficiais.'){$shape.TextFrame.TextRange.Text='Mantém dados e progresso no navegador; cache PWA permite recarga sem rede.'}
   if($text -eq 'As três melhorias adicionais conectam decisão, ação e recuperação.'){$shape.TextFrame.TextRange.Text='Priorizar, executar e continuar: o essencial para a rotina do aluno.'}
   if($text -like 'Fonte:*'){$shape.TextFrame.TextRange.Text='Fonte: Etapas 2 e 3 · diferenciais e restrições do documento'}
  }
 }
 $deck.SaveAs($out,24)
 $deck.SaveAs($pdf,32)
 $previews=Join-Path $folder 'pitch-curto'
 New-Item -ItemType Directory -Force -Path $previews | Out-Null
 foreach($slide in $deck.Slides){$slide.Export((Join-Path $previews ('slide-{0:00}.png' -f $slide.SlideIndex)),'PNG',1600,900)}
 $deck.Close();$deck=$null
 $verify=$ppt.Presentations.Open($out,-1,0,0)
 if($verify.Slides.Count -ne 5){throw 'Contagem de slides inválida.'}
 $verify.Close()
 Write-Output 'Validado: 5 slides, notas de fala, tempo sugerido de 4min50s.'
 Write-Output $out
}finally{
 if($null -ne $deck){$deck.Close()}
 if($null -ne $ppt -and $initialCount -eq 0){$ppt.Quit()}
}

