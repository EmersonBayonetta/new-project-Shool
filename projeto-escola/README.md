# Trilha — Sua jornada acadêmica, organizada

Protótipo funcional local baseado em `../prompt.md`. React 19, TypeScript estrito e Vite, sem backend, APIs externas ou dependências de interface adicionais.

## Executar no Windows

Na pasta do workspace:

```powershell
cd new-project-Shool/projeto-escola
npm.cmd ci
npm.cmd run dev
```

Abra a URL exibida pelo Vite, normalmente `http://localhost:5173`. O uso de `npm.cmd` evita a restrição de execução de scripts do PowerShell. Em outros shells, use `npm`.

Para apresentar a versão de produção e testar a recarga offline:

```powershell
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4173
```

Abra `http://127.0.0.1:4173`. Visite uma vez conectado para instalar o service worker e preencher o cache. O cache PWA é registrado somente na versão de produção. Dados são separados por origem: localhost, 127.0.0.1 e portas diferentes possuem bases diferentes.

## Funcionalidades

- Dashboard com prioridades explicáveis, próximo passo, métricas reais, progresso semanal e evolução por XP.
- Atividades com criação, edição, exclusão confirmada, pesquisa e filtros por disciplina, prioridade, status e prazo.
- Etapas com tempo estimado, conclusão reversível, adição e reordenação. Progresso individual separado do registro compartilhado da atividade.
- Calendário mensal com seleção de datas, marcadores de prioridade e filtros, consultando as mesmas atividades.
- XP determinístico: 10 por etapa, 30 por atividade e 20 por conclusão no prazo. Desfazer conclusões recalcula pontos e medalhas.
- Plano pessoal de recuperação, com prioridade por prazo e esforço, aceitação e ajuste de dias. A meta diária é de 120 minutos; etapas maiores reservam dias exclusivos. O plano nunca altera prazos oficiais.
- Assistente demonstrativo por intenções locais, consultando atividades reais, sem IA generativa ou chamadas externas.
- Notas editáveis, checklist pessoal, quiz local com explicações e histórico de resultados.
- Comunidade por turma, com posts e respostas locais e exclusão de conteúdo próprio.
- Mural com publicação, edição, exclusão e marcação de leitura; atualizações compartilhadas entre perfis.
- Professor: publicação de atividades, acompanhamento individual por aluno e aprovação/rejeição justificada de prorrogações. Aprovar atualiza o prazo compartilhado sem apagar progresso.
- Administrador: cadastro e edição de turmas, disciplinas e usuários fictícios, associação a turmas e disciplinas e inspeção dos perfis cadastrados.
- Totem com avisos públicos e estado explicativo para QR Code sem URL pública configurada.
- Tema claro/escuro, texto ampliado, contraste, movimento reduzido, foco de teclado, diálogo modal acessível, tour opcional e roteiro de pitch.
- IndexedDB para os dados; localStorage para preferências; indicador de conectividade, simulação offline identificada e cache PWA.

## Organização

```text
src/
  App.tsx                    navegação por rotas hash e telas integradas
  components/
    AssignmentForm.tsx       formulário e validação de atividades
    Modal.tsx                painel acessível com diálogo nativo
    Flame.tsx                indicador visual de evolução
  types.ts                   entidades e relacionamentos
  domain.ts                  prioridade, progresso, XP e recuperação
  demo.ts                    seed e perguntas demonstrativas
  storage.ts                 repositório IndexedDB e fila de gravação
  utils.ts                   IDs e datas locais
  App.css                    identidade visual, temas e responsividade
public/
  sw.js                      cache offline da versão de produção
  manifest.webmanifest       metadados PWA
tests/
  domain.test.mjs             testes das regras críticas
  browser.mjs                 testes reais via Chrome DevTools Protocol
```

O seed roda quando não existe estado salvo. Uma lista de atividades esvaziada pelo usuário não causa reseed. As datas iniciais são relativas à data do navegador. A restauração é uma ação explícita com confirmação.

## Validação

Requer Node 24 para os testes, que executam TypeScript diretamente.

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
npm.cmd run test:browser
```

Foram aprovados **10 testes de regras e 17 cenários em navegador**, incluindo criação pelo professor, leitura pelo aluno, XP reversível, persistência após recarga, filtros, mudança de prazo, calendário, planejamento, formulários inválidos, estudo, comunidade, comunicados, prorrogação, administração, teclado, mobile de 390 px, recarga realmente sem rede e restauração. Nenhum erro de execução detectado no navegador.

O teste de navegador inicia e encerra seu próprio servidor de produção e navegador com perfil temporário isolado. Utiliza Chrome instalado no caminho padrão do Windows, sem adicionar bibliotecas. Para outro executável:

```powershell
$env:TRILHA_BROWSER = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
npm.cmd run test:browser
```

As portas 4173 e 9223 precisam estar disponíveis. O navegador de testes usa `--no-sandbox` para compatibilidade com o ambiente restrito de execução e acessa apenas a aplicação local. Capturas desktop/mobile e relatório são gerados em `artifacts/`, ignorado pelo Git.

## Roteiro de apresentação

1. Abra a Visão geral como aluno e explique as prioridades e o próximo passo.
2. Alterne o seletor superior para Professor.
3. Abra Atividades e publique uma atividade com etapas para a turma A.
4. Volte ao Aluno e abra a atividade recém-criada.
5. Conclua uma etapa; confira progresso e XP. Desmarque e remarque para mostrar a consistência.
6. Abra Meu planejamento, aceite o plano e ajuste um dia de estudo.
7. Ative Simular offline, registre progresso e aguarde o indicador Dados salvos.
8. Recarregue; os dados permanecem no navegador. Na versão de produção com cache preparado, também é possível desligar a rede de verdade.
9. Mostre calendário, conquistas e avisos. Solicite uma prorrogação e aprove com justificativa no Professor.
10. Para reiniciar, use Roteiro do pitch → Restaurar dados da demonstração.

## Limites demonstrativos

A troca de perfis não é autenticação segura. Publicações, comunidade e solicitações não são enviadas a outras pessoas ou dispositivos. Não existe sincronização com servidor, notificações externas, IA generativa ou integração física com totem. O QR Code não é gerado sem uma URL pública configurada. Ranking é opcional e não foi incluído. Limpar os dados do navegador remove a base local.
