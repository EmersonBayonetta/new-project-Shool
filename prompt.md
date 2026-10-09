# DESENVOLVIMENTO DE PROTÓTIPO FUNCIONAL — PLATAFORMA INTELIGENTE DE ACOMPANHAMENTO ACADÊMICO

## 1. Papel da IA desenvolvedora

Atue como uma equipe sênior de engenharia de software, arquitetura frontend, UX/UI Design, design de produtos educacionais e desenvolvimento de aplicações offline-first.

Sua missão é **desenvolver uma aplicação web completa focado em mobile , visualmente premium, responsiva, navegável e funcional**, para demonstrar em um pitch uma solução inovadora de organização acadêmica.

Não entregue apenas um conceito, wireframe, landing page, mockup ou conjunto de telas estáticas.

Implemente um protótipo interativo em que as principais ações tenham consequências reais no estado da aplicação, incluindo criação, edição, exclusão, conclusão, cálculos, filtros e persistência local.

A aplicação será apresentada em uma demonstração ao vivo. Portanto, estabilidade, clareza, consistência dos dados e qualidade visual são prioridades.

Nome provisório da aplicação: **Trilha — Sua jornada acadêmica, organizada.**

Organize o código para permitir mudança futura do nome e da identidade visual.

---

## ETAPA 1 — ENTENDER ANTES DE CRIAR

### Situação-problema

Uma escola técnica percebeu que muitos alunos estão perdendo prazos de trabalhos, avaliações, atividades e projetos.

As informações já circulam por agendas, calendários, grupos de WhatsApp e sistemas acadêmicos, mas os estudantes continuam esquecendo ou adiando suas responsabilidades.

A solução NÃO deve se limitar a criar outra agenda.

### Objetivo

Desenvolver uma plataforma que ajude os alunos a:

- Centralizar suas responsabilidades acadêmicas.
- Entender quais tarefas precisam de atenção imediata.
- Organizar trabalhos em pequenas etapas.
- Acompanhar visualmente sua evolução.
- Desenvolver constância por meio de gamificação.
- Recuperar o planejamento quando houver atividades acumuladas.
- Consultar dados e registrar progresso sem internet.
- Utilizar recursos de estudo e colaboração.

### Insight fundamental

**O aluno não precisa apenas saber quando uma atividade vence. Precisa descobrir o que fazer agora, como avançar e quanto falta para concluir.**

Todas as decisões de interface e funcionalidades devem reforçar esse conceito.

### Público-alvo

**Aluno:** usuário principal. A experiência deve priorizar organização, clareza, motivação e simplicidade.

**Professor:** usuário complementar, responsável por cadastrar atividades, acompanhar entregas e compartilhar comunicados.

**Administrador:** responsável por gerenciar dados demonstrativos de turmas, disciplinas e usuários.

O sistema deve permitir alternar entre os três perfis sem autenticação real, exclusivamente para demonstração. Exiba uma indicação discreta de "Ambiente de demonstração".

---

## ETAPA 2 — TEMPESTADE DE IDEIAS TRANSFORMADA EM FUNCIONALIDADES

Desenvolva os seguintes módulos, organizados por domínio.

### MÓDULO A — DASHBOARD DO ALUNO

Crie uma página inicial moderna, com hierarquia visual clara e os seguintes componentes:

1. Saudação contextual com o nome do aluno.
2. Resumo das atividades pendentes.
3. Atividades urgentes.
4. Próximas entregas.
5. Quantidade de tarefas concluídas.
6. Progresso semanal.
7. Pontuação XP acumulada.
8. Indicador gamificado de evolução.
9. Comunicados recentes.
10. Botão destacado "Meu próximo passo".

As tarefas devem ser classificadas automaticamente, por meio de regras locais, em:

- Urgente.
- Atenção.
- Em dia.
- Concluída.
- Atrasada.

Considere data de vencimento, tempo estimado, quantidade de etapas pendentes e progresso.

A classificação deve ser explicável. Exemplo: "Prioridade alta: entrega em 2 dias, com 4 etapas pendentes".

Não utilize uma classificação aleatória.

O dashboard deve reagir imediatamente às alterações feitas em outros módulos.

### MÓDULO B — GERENCIAMENTO DE ATIVIDADES

Implemente CRUD completo de atividades.

Cada atividade deve possuir:

- ID único.
- Título.
- Descrição.
- Disciplina.
- Turma.
- Professor responsável.
- Data de criação.
- Prazo de entrega.
- Prioridade calculada.
- Status.
- Tempo estimado.
- Etapas ou subtarefas.
- Porcentagem de conclusão.
- Instruções.
- Campo opcional de observações.

Permita criar, editar, excluir, filtrar, pesquisar e consultar atividades.

Inclua filtros por disciplina, prioridade, status e prazo.

A exclusão deverá exigir confirmação.

Os detalhes devem abrir em uma página própria ou painel lateral acessível.

### MÓDULO C — PLANEJAMENTO POR ETAPAS

Este é um dos principais diferenciais da plataforma.

O usuário deve poder dividir uma atividade em subtarefas menores, com estimativas de tempo.

Exemplo:

Atividade: Projeto Integrador

- Pesquisar requisitos.
- Planejar estrutura.
- Criar protótipo.
- Desenvolver interface.
- Testar funcionalidades.
- Revisar e concluir.

Cada etapa terá uma checkbox funcional.

A conclusão deverá atualizar:

- Progresso percentual.
- Status da atividade.
- Dashboard.
- Pontuação do aluno.
- Indicadores gerais.

O cálculo de progresso deve seguir uma regra determinística e consistente.

Adicione o recurso **"Meu próximo passo"**, que identifica uma etapa pendente prioritária e sugere uma ação concreta.

O usuário também pode adicionar ou reorganizar etapas.

Não dependa de API de IA para executar esse planejamento.

### MÓDULO D — CALENDÁRIO ACADÊMICO

Implemente calendário funcional com:

- Navegação entre meses.
- Seleção de datas.
- Visualização de entregas.
- Marcadores por prioridade.
- Filtros por disciplina.
- Abertura dos detalhes de uma atividade ao clicar nela.

O calendário deve utilizar as mesmas atividades persistidas no sistema, sem duplicar dados.

### MÓDULO E — GAMIFICAÇÃO

Implemente um sistema de gamificação com regras reais.

Elementos:

- XP por conclusão de etapas.
- XP por conclusão de atividades.
- Medalhas por conquistas.
- Indicador de evolução representado por uma chama.
- Progresso semanal.
- Metas pessoais.
- Histórico de conquistas.
- Ranking opcional, quando houver dados demonstrativos suficientes.

Exemplo de regras iniciais:

- Concluir etapa: +10 XP.
- Concluir uma atividade: +30 XP adicionais.
- Concluir atividade antes do prazo: +20 XP adicionais.
- Concluir a primeira atividade: desbloquear medalha.

Evite duplicar recompensas quando uma etapa concluída for marcada novamente.

Se uma conclusão for desfeita, mantenha a pontuação coerente utilizando eventos reversíveis ou recálculo determinístico.

Não associe XP a notas acadêmicas.

O ranking não deve expor notas escolares nem dificuldades individuais.

Evite mecânicas punitivas por ausência de uso.

### MÓDULO F — ASSISTENTE ACADÊMICO CONTEXTUAL

Desenvolva uma interface de chat integrada à plataforma.

O assistente deve ter aparência moderna, mensagens organizadas e sugestões rápidas.

Exemplos:

- "Quais atividades tenho para esta semana?"
- "O que devo fazer primeiro?"
- "Como posso organizar meus estudos?"
- "Quais tarefas estão atrasadas?"
- "Crie um plano para minha próxima entrega."

**Implementação obrigatória para o protótipo:**

O assistente deverá utilizar regras locais e interpretar intenções pré-definidas, consultando os dados reais da aplicação.

Não utilize OpenAI API nem qualquer serviço externo.

As respostas devem ser contextuais, evitando textos genéricos quando existir informação local disponível.

Quando a pergunta não puder ser respondida pelo mecanismo local, informe a limitação e ofereça opções disponíveis.

Identifique discretamente o recurso como **"Assistente demonstrativo"**. Não afirme que existe IA generativa real quando ela não estiver integrada.

### MÓDULO G — PLANO DE RECUPERAÇÃO

Implemente um recurso para alunos com múltiplas atividades acumuladas.

O sistema deve:

1. Identificar atividades atrasadas ou próximas do vencimento.
2. Examinar as etapas pendentes.
3. Considerar prazos e estimativas de esforço.
4. Sugerir uma sequência de execução.
5. Mostrar uma visão organizada dos próximos dias.
6. Permitir aceitar ou ajustar o planejamento pessoal.

Exiba mensagens motivacionais objetivas, sem culpabilização.

O plano não poderá alterar prazos oficiais definidos pelos professores.

### MÓDULO H — FERRAMENTAS DE ESTUDO

Inclua:

- Bloco de notas com criação, edição e exclusão.
- Anotações vinculadas a disciplinas.
- Checklist pessoal.
- Quiz interativo.
- Histórico de resultados dos quizzes.

O quiz deverá utilizar perguntas de uma base demonstrativa local.

Permita selecionar uma disciplina, responder questões e receber feedback ao final.

Mostre acertos, erros e explicações cadastradas.

Não apresente o quiz como geração automática por IA.

### MÓDULO I — COMUNIDADE ACADÊMICA

Implemente uma comunidade demonstrativa por turma.

O usuário poderá:

- Visualizar publicações.
- Criar posts.
- Responder a discussões.
- Excluir seus próprios posts e comentários.
- Pesquisar tópicos.

Utilize armazenamento local e dados fictícios.

Não simule uma comunicação remota real.

Os conteúdos criados devem ficar disponíveis quando o usuário retornar à aplicação no mesmo navegador.

### MÓDULO J — MURAL E COMUNICADOS

Crie uma área para visualizar comunicados da instituição e dos docentes.

Cada comunicado deve conter título, conteúdo, autor, turma ou público-alvo e data.

Permita marcar comunicados como lidos.

No perfil do professor, implemente criação, edição e exclusão de comunicados demonstrativos.

As alterações devem ser refletidas na visualização do aluno correspondente.

### MÓDULO K — PAINEL DO PROFESSOR

Crie uma interface específica para o perfil docente.

Funcionalidades:

- Dashboard da turma.
- Cadastro de atividades.
- Edição de atividades.
- Publicação de comunicados.
- Cadastro de etapas sugeridas.
- Visualização demonstrativa das entregas.
- Indicadores de atividades concluídas e pendentes.
- Recebimento de solicitações de prorrogação.
- Aprovação ou rejeição justificada das solicitações.

Para demonstrar entregas, crie uma estrutura de status por aluno, separada das atividades gerais da turma.

Uma atividade publicada pelo professor deve aparecer automaticamente no painel do aluno vinculado à turma dentro do mesmo ambiente local.

Quando o professor alterar um prazo autorizado, os dados deverão ser atualizados consistentemente.

### MÓDULO L — PAINEL ADMINISTRATIVO

Implemente funcionalidades demonstrativas de gestão:

- Cadastro e edição de turmas.
- Cadastro e edição de disciplinas.
- Cadastro e edição de usuários fictícios.
- Associação de alunos a turmas.
- Associação de professores a disciplinas.
- Visão geral de atividades e usuários cadastrados.

Mantenha os relacionamentos consistentes.

Não represente a alternância de perfis como autenticação segura.

### MÓDULO M — TOTEM E QR CODE

Crie uma visualização demonstrativa de totem acadêmico, acessível pelo painel administrativo.

Exiba comunicados públicos, instruções e um QR Code demonstrativo que aponte para a rota pública da aplicação quando houver URL definida.

Se não houver URL compartilhável, exiba um estado explicativo em vez de gerar um QR Code inválido.

Não simule integração com um equipamento físico.

Trate o totem como um complemento, sem comprometer a entrega dos módulos prioritários.

---

## ETAPA 3 — CARTAS DE RESTRIÇÃO

### RESTRIÇÃO 1 — FUNCIONAMENTO OFFLINE

A aplicação deverá funcionar sem backend e sem serviços externos para as ações essenciais.

Implemente:

- IndexedDB para dados estruturados.
- localStorage para preferências simples.
- Persistência de atividades, usuários fictícios, progresso, XP, anotações e demais informações.
- Indicador de conectividade.
- Modo de demonstração offline.
- Identificação de informações armazenadas localmente.
- Estado demonstrativo de sincronização pendente.

Se o ambiente permitir, implemente PWA com service worker e cache dos recursos necessários para recarregar o aplicativo sem conexão após a primeira visita.

O botão "Simular offline" deve ativar um modo de demonstração local, sem fingir que desligou efetivamente a conexão do dispositivo.

Não afirme que houve sincronização real com servidor.

Caso o projeto não utilize backend, todas as alterações entre perfis deverão acontecer dentro da mesma base local.

### RESTRIÇÃO 2 — GAMIFICAÇÃO FUNCIONAL

Os pontos, conquistas e indicadores deverão responder a ações reais.

Não utilize números fixos ou aleatórios para simular progresso após o carregamento inicial.

As métricas devem ser calculadas a partir dos dados persistidos.

### RESTRIÇÃO 3 — BAIXA FAMILIARIDADE TECNOLÓGICA

A interface deverá priorizar:

- Navegação intuitiva.
- Linguagem simples.
- Botões claros.
- Hierarquia visual consistente.
- Textos legíveis.
- Feedback imediato após cada ação.
- Formulários simples.
- Mensagens de erro compreensíveis.
- Estados vazios explicativos.
- Tour inicial opcional.
- Ajuda contextual.

Inclua controles de acessibilidade para tamanho de fonte, contraste e movimento reduzido.

Respeite navegação por teclado, foco visível e semântica acessível dos componentes.

---

## ETAPA 4 — SCAMPER APLICADO AO DESIGN

Utilize os seguintes princípios como regras de produto.

### Substituir

Substituir informações acadêmicas dispersas por um painel centralizado de acompanhamento.

### Combinar

Integrar calendário, atividades, etapas, progresso, gamificação e recursos de estudo em uma experiência consistente.

### Adaptar

Utilizar conceitos de gerenciamento de projetos, trilhas de aprendizagem e produtividade pessoal.

### Modificar

Diminuir complexidade visual, excesso de alertas e quantidade de ações necessárias para concluir tarefas simples.

### Propor outro uso

Permitir que a plataforma apoie preparação para avaliações, revisão de conteúdos e projetos em grupo.

### Eliminar

Evitar páginas redundantes, fluxos desnecessariamente longos e informações repetidas.

### Reorganizar

A jornada inicial deve apresentar primeiro **o que o aluno precisa fazer agora**, depois calendário e demais funcionalidades.

---

## ETAPA 5 — TRATAMENTO DOS CENÁRIOS "E SE...?"

Implemente comportamentos para:

**E se o aluno estiver sem internet?**

Permitir acesso aos dados locais, criação de anotações e atualização do progresso.

**E se não receber notificações?**

Exibir prioridades claramente no dashboard.

**E se acumular cinco atividades?**

Oferecer um Plano de Recuperação.

**E se não souber por onde começar?**

Disponibilizar "Meu próximo passo".

**E se dois alunos quiserem colaborar?**

Permitir interação demonstrativa na comunidade local.

**E se o usuário tiver dificuldade para utilizar a aplicação?**

Oferecer tour opcional e orientações contextuais.

**E se o professor modificar uma atividade?**

Atualizar o registro compartilhado localmente, preservando progresso individual quando aplicável.

**E se a página for atualizada?**

Restaurar todos os dados persistidos.

**E se não existir nenhuma atividade?**

Exibir um estado vazio amigável com uma ação adequada ao perfil.

**E se o usuário tentar executar uma ação inválida?**

Exibir feedback e impedir alterações inconsistentes.

---

## ETAPA 6 — PROTÓTIPO FUNCIONAL PARA PITCH

### Arquitetura técnica

Utilize preferencialmente:

- React.
- TypeScript em modo estrito.
- Vite.
- Tailwind CSS.
- shadcn/ui.
- React Router.
- Lucide React.
- Recharts.
- IndexedDB com uma biblioteca leve, como Dexie.
- React Hook Form e Zod para formulários e validação.

Não utilize Supabase, Firebase, banco remoto, autenticação externa nem APIs pagas.

Não introduza dependências desnecessárias.

### Organização do projeto

Adote uma arquitetura modular com separação entre:

- Páginas.
- Componentes.
- Layouts.
- Hooks.
- Serviços locais.
- Repositórios de dados.
- Tipos TypeScript.
- Regras de negócio.
- Dados demonstrativos.
- Utilitários.
- Preferências do usuário.

Centralize as regras de prioridade, XP, progresso e recuperação em funções reutilizáveis e testáveis.

Não espalhe regras de negócio entre componentes visuais.

### Modelo de dados

Modele entidades como:

- User.
- Role.
- Class.
- Subject.
- Assignment.
- AssignmentStep.
- AssignmentProgress.
- Submission.
- ExtensionRequest.
- Announcement.
- Note.
- Achievement.
- XpEvent.
- Quiz.
- QuizQuestion.
- QuizAttempt.
- CommunityPost.
- CommunityComment.
- PersonalPlan.

Utilize IDs estáveis e relacionamentos consistentes.

Evite duplicar atividades para cada aluno quando um registro compartilhado com progresso individual resolver o problema.

### Dados demonstrativos

Popule o sistema inicialmente com dados fictícios realistas de uma escola técnica brasileira.

Crie:

- 1 instituição fictícia.
- 3 turmas.
- 4 professores.
- 12 alunos.
- 6 disciplinas técnicas.
- Pelo menos 15 atividades variadas.
- Projetos com várias etapas.
- Atividades urgentes, futuras, concluídas e atrasadas.
- Comunicados.
- Notas.
- Quizzes.
- Conquistas.
- Publicações da comunidade.

Utilize nomes fictícios.

Calcule os estados de prazo dinamicamente em relação à data atual do navegador, evitando que a demonstração envelheça.

Execute o seed apenas quando a base estiver vazia, para não substituir dados criados pelo usuário.

Inclua uma ação explícita de "Restaurar dados da demonstração", com confirmação.

### Identidade visual premium

Crie uma interface com qualidade visual de produto SaaS profissional.

Direção de design:

- Minimalista e moderna.
- Profissional, mas acolhedora.
- Inspirada em dashboards de produtos digitais contemporâneos.
- Sem aparência infantil.
- Sem excesso de cores.
- Espaçamento consistente.
- Tipografia legível.
- Componentes elegantes.
- Ícones padronizados.
- Microinterações discretas.
- Animações suaves.
- Estados de hover, foco e carregamento.
- Visualização confortável de dados.

Paleta sugerida:

- Azul profundo para identidade principal.
- Violeta discreto para inteligência e evolução.
- Verde para conquistas e progresso.
- Âmbar para avisos.
- Vermelho apenas para urgências e erros.
- Superfícies neutras, claras e refinadas.

Implemente tema claro e escuro.

Use sidebar no desktop e navegação adaptada no mobile.

A interface deve ser responsiva, começando pelas telas de dispositivos móveis e adaptando-se a tablets e desktops.

Evite dashboards superlotados.

### Navegação

Implemente rotas reais para os principais módulos.

Use layouts distintos por perfil.

Os menus devem funcionar, refletir o estado ativo e permitir navegação consistente.

Inclua breadcrumbs onde forem úteis.

Garanta estados de carregamento, erro, ausência de dados e confirmação.

### Experiência de apresentação

Adicione um recurso discreto de **"Roteiro do Pitch"**, disponível somente no ambiente demonstrativo.

Esse recurso deve guiar o apresentador pelas seguintes ações:

1. Mostrar o problema e o dashboard do aluno.
2. Apresentar prioridades acadêmicas.
3. Alternar para o professor.
4. Criar uma atividade com etapas.
5. Retornar ao perfil do aluno.
6. Mostrar a atividade recém-criada.
7. Concluir uma etapa.
8. Demonstrar atualização de progresso e XP.
9. Abrir o Plano de Recuperação.
10. Ativar o modo offline demonstrativo.
11. Mostrar que o progresso continua sendo armazenado.
12. Exibir os principais indicadores.

Inclua um botão para reiniciar o cenário da demonstração, com confirmação.

O roteiro não deverá bloquear a navegação livre.

---

## REQUISITOS OBRIGATÓRIOS DE FUNCIONALIDADE

Considere a implementação incompleta se:

- Botões visíveis não executarem ações.
- Formulários não salvarem os dados.
- O calendário não refletir as atividades reais.
- O progresso não for recalculado.
- O XP não responder às conclusões.
- O perfil do professor não compartilhar a base local com o aluno.
- O armazenamento for perdido ao atualizar a página.
- O assistente apresentar respostas aleatórias sem consultar os dados disponíveis.
- Os filtros forem apenas visuais.
- O usuário conseguir entrar em estados inválidos sem receber feedback.
- A experiência mobile apresentar elementos cortados.
- Recursos simulados forem apresentados como serviços reais.

Não use funções vazias, TODOs ou ações fictícias disfarçadas de funcionalidades completas.

Todo elemento interativo deverá estar implementado ou explicitamente identificado como recurso demonstrativo limitado.

### Critérios de aceitação

Execute ou implemente testes para validar pelo menos os seguintes cenários:

1. Professor cria uma atividade e aluno da turma consegue visualizá-la.
2. Aluno conclui uma etapa e o progresso é atualizado.
3. XP é contabilizado corretamente, sem duplicações.
4. Calendário reflete a data de entrega cadastrada.
5. Dados persistem após atualizar a página.
6. Filtros e pesquisa retornam resultados coerentes.
7. Professor altera um prazo e o registro local é atualizado.
8. O Plano de Recuperação não modifica prazos oficiais.
9. O modo offline demonstrativo mantém as operações locais.
10. O usuário consegue navegar pelas principais funcionalidades em viewport mobile.
11. Os formulários rejeitam dados inválidos.
12. A restauração dos dados demonstrativos funciona.
13. A troca de perfis mantém a consistência das informações.
14. A navegação por teclado funciona nos fluxos essenciais.

Utilize testes automatizados para regras críticas quando possível e valide a aplicação em execução.

---

## PRIORIDADES DE IMPLEMENTAÇÃO

Siga esta ordem de execução:

**P0 — Núcleo obrigatório**

Arquitetura, modelos de dados, persistência, seleção de perfis, navegação, dashboard do aluno, atividades, etapas, calendário, regras de prioridade e gamificação.

**P1 — Diferenciais do pitch**

Painel do professor, assistente contextual demonstrativo, Plano de Recuperação, comunicados, recursos de estudo e modo offline.

**P2 — Complementos**

Comunidade, painel administrativo, totem demonstrativo, ranking opcional e refinamentos adicionais.

Priorize uma experiência integrada e estável em vez de dezenas de telas parcialmente funcionais.

Não reduza a aplicação a um mockup caso o ambiente tenha capacidade de gerar e executar código.

---

## INSTRUÇÃO FINAL PARA A IA

Desenvolva a aplicação com base nas especificações anteriores, produzindo um protótipo funcional e coerente, com componentes reutilizáveis e dados persistidos localmente.

Tome decisões técnicas sensatas quando houver detalhes não especificados, preservando o objetivo principal da solução.

Não interrompa a implementação para solicitar decisões estéticas menores.

Não utilize links externos como substitutos de funcionalidades internas.

Não gere somente imagens, documentação ou wireframes.

Implemente o código da aplicação e, quando o ambiente permitir, execute-a e valide seus fluxos principais.

**Resultado esperado:** uma plataforma acadêmica com experiência visual premium, funcionalidades interativas, gamificação real baseada em ações locais, perfis demonstrativos integrados, planejamento acadêmico por etapas e um roteiro completo para apresentação do pitch.

A principal mensagem da solução deve permanecer evidente em toda a experiência:

**"Mais do que lembrar prazos, ajudamos você a concluir cada etapa."**
