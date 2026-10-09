# Solução acadêmica — Documento ajustado por etapas

> **Status:** proposta conceitual revisada para discussão da equipe e preparação de pitch. As funcionalidades descritas são propostas; não representam um sistema já desenvolvido nem resultados validados com estudantes.
>
> **Diretriz:** preservar a estrutura do exercício original (Etapas 1 a 6), mantendo a situação-problema ao final. As respostas abaixo consolidam as ideias do grupo e incorporam melhorias sugeridas na avaliação.

## Etapa 1 — Entender antes de criar

**O grupo precisa investigar o problema. Analisem e respondam:**

### Quem é o usuário?
**R:** O público principal são os **alunos de uma escola técnica**, que precisam organizar trabalhos, avaliações, atividades e projetos. Os **professores** são usuários complementares, responsáveis por cadastrar tarefas, esclarecer orientações, acompanhar entregas e publicar comunicados. A coordenação/administração pode ter um perfil de gestão, em uma etapa posterior ou no protótipo demonstrativo.

### Qual é o problema aparente?
**R:** Alunos esquecem ou adiam atividades, perdem prazos e aparentam falta de comprometimento. **Essa aparência não deve ser confundida automaticamente com a causa do problema.**

### Qual pode ser o problema real?
**R:** Informações acadêmicas dispersas entre WhatsApp, agendas, calendários e sistemas; dificuldade de visualizar prioridades, organizar trabalhos longos em etapas e acompanhar o próprio progresso. Limitações de conexão, excesso de notificações e políticas pouco flexíveis podem agravar o problema. **São hipóteses a confirmar com alunos e docentes**, não conclusões já comprovadas.

### Por que as soluções existentes podem não funcionar?
**R:** Muitas ferramentas registram datas, mas não orientam **como executar** as tarefas. A fragmentação dos canais dificulta encontrar a versão atualizada de um comunicado. Sem internet, os alunos podem ficar sem receber novidades; alertas em excesso podem ser ignorados. Uma agenda adicional sem integração ou apoio à execução repetiria o problema.

### Pergunta norteadora reformulada
**Como podemos ajudar alunos a compreender, priorizar e concluir suas responsabilidades acadêmicas, inclusive com conexão limitada, sem criar apenas mais uma agenda?**

### Insight central
**O aluno não precisa somente saber quando uma atividade vence: precisa saber o que fazer agora, como avançar e quanto falta para terminar.**

---

## Etapa 2 — Tempestade das 20 ideias

**Objetivo original:** gerar possibilidades criativas antes de selecionar prioridades. A lista abaixo mantém as **22 ideias do grupo**, com ajustes de descrição e escopo.

1. **Alertas em tela:** avisos visuais claros sobre atividades importantes, sem excesso de interrupções.
2. **Totem na escola com QR Code:** ponto físico para consulta de informações públicas e acesso rápido à plataforma; requer definir infraestrutura e conectividade para cada uso.
3. **Aplicativo que programa tarefas:** atividades com prazo, subtarefas, estimativa de esforço e acompanhamento.
4. **Mural eletrônico:** avisos organizados por turma, disciplina e relevância.
5. **Flexibilização da entrega:** pedido de extensão de prazo pelo aluno, sujeito à decisão do professor; nenhuma alteração automática de prazo oficial.
6. **Pontuação por etapa concluída:** XP ligado ao progresso real, sem substituir avaliação pedagógica.
7. **Ranking de pontuação:** classificação opcional com foco na participação e sem exposição de notas ou dificuldades individuais.
8. **Lembretes motivacionais:** mensagens objetivas baseadas em prazos e progresso, configuráveis pelo aluno.
9. **Chatbot acadêmico por texto ou voz:** ajuda a interpretar tarefas e organizar a rotina; integração real com IA ou voz dependerá de implementação futura.
10. **IA para otimizar o aplicativo:** sugestões contextuais de próximos passos e de planejamento; versões iniciais podem usar regras locais.
11. **Recursos de acessibilidade:** contraste, navegação por teclado, linguagem simples, leitores de tela e tamanho de texto ajustável, priorizando recursos nativos e padrões de acessibilidade.
12. **Indicador gamificado de evolução (chama):** símbolo visual de consistência, sem punição ou constrangimento por pausas.
13. **Kit de ferramentas de estudo:** resumos pessoais, técnicas de revisão e materiais reunidos em um lugar.
14. **Quiz interativo e multiplayer local:** prática e revisão com pontuação; multiplayer real fica para uma fase de maior maturidade.
15. **Bloco de notas em estilo post-it:** anotações rápidas associadas a disciplinas e atividades.
16. **Questões de estudo geradas por IA:** baseadas nos conteúdos fornecidos ou autorizados, distinguindo geração real de conteúdo demonstrativo.
17. **Checklist das tarefas:** decomposição de projetos em etapas verificáveis.
18. **Lembretes de tarefas:** notificações no próprio sistema e, futuramente, notificações do dispositivo quando tecnicamente disponíveis.
19. **Comunidade de alunos:** espaço por turma para dúvidas e colaboração, sujeito a regras e moderação.
20. **Logins/perfis separados:** aluno, professor e, quando necessário, administrador, cada um com permissões próprias.
21. **Filtros inteligentes:** ordenar tarefas por vencimento, disciplina, urgência e progresso; uso de IA é opcional.
22. **Tour inicial de uso:** orientação curta, acessível, com opção de pular e rever a qualquer momento.

### Organização das ideias em cinco pilares

- **Centralização:** tarefas, calendário, mural, notas e filtros (3, 4, 15, 17, 21).
- **Planejamento e apoio:** lembretes, divisão em etapas, chatbot e revisão (1, 8, 9, 10, 16, 18).
- **Motivação:** XP, ranking opcional, chama e quiz (6, 7, 12, 14).
- **Acesso inclusivo:** offline, acessibilidade, navegação simples e tour (11, 22; complementados pela Etapa 3).
- **Colaboração e gestão:** docentes, comunidade, prazos e totem (2, 5, 19, 20).

### Três ideias adicionais propostas após a tempestade

- **Planejamento inteligente por etapas:** transformar uma entrega em pequenas ações com progresso visível.
- **Prioridade explicável:** sinalizar atividades urgentes de acordo com prazo, esforço e pendências, mostrando o motivo.
- **Plano de recuperação:** sugerir uma reorganização pessoal quando houver tarefas acumuladas, sem modificar prazos estabelecidos pelo professor.

---

## Etapa 3 — Cartas de restrição

**Restrições obrigatórias do exercício:**

### 1. A solução precisa funcionar sem internet
**R:** O aplicativo deve adotar uma abordagem **offline-first** para suas funções essenciais: visualizar tarefas previamente armazenadas, consultar prazos, criar anotações, marcar etapas como concluídas e manter o progresso local. Quando a rede retornar, uma versão com backend poderá sincronizar alterações. **Não será possível receber novas publicações de docentes enquanto não houver conexão/sincronização.**

**Para o protótipo local:** usar persistência no navegador (preferencialmente IndexedDB para dados estruturados e localStorage para preferências). Simular estado offline e fila de sincronização de maneira identificada como demonstração. Um modo offline real para recarregar a aplicação sem internet exigirá recursos de PWA e armazenamento dos arquivos da aplicação.

### 2. A solução precisa utilizar gamificação
**R:** Conquistas, progresso de atividades, XP, evolução visual da chama e metas pessoais. A pontuação deve reconhecer constância e conclusão, sem punir estudantes nem confundir XP com nota acadêmica. Rankings públicos, se incluídos, devem ser opcionais.

### 3. A solução precisa funcionar para pessoas com baixa familiaridade tecnológica
**R:** Tela inicial com poucas ações principais, textos simples, botões claramente identificados, boa legibilidade, navegação consistente, mensagens de confirmação, feedback após cada ação e tour inicial opcional. O processo mais comum deve ser fácil: **entrar → ver a prioridade → abrir a tarefa → concluir uma etapa**.

### Critérios de aceitação propostos

- Uma atividade cadastrada localmente continua disponível após recarregar a página.
- Um aluno consegue ver suas próximas tarefas e atualizar o progresso sem depender de uma resposta de IA.
- Toda conquista é causada por uma ação demonstrável e não apenas por animação decorativa.
- O usuário consegue navegar sem concluir o tour inicial.
- O sistema diferencia informação atualizada de informação armazenada anteriormente.

---

## Etapa 4 — Técnica SCAMPER

**Ideia escolhida:** plataforma integrada de acompanhamento acadêmico, baseada no aplicativo de tarefas proposto pelo grupo.

### S — Substituir
**O que podemos substituir na solução?**

**R:** Substituir a consulta dispersa a diversos aplicativos por um **painel acadêmico centralizado**. Substituir uma simples lista de datas por um planejamento orientado a ações, com tarefas e subtarefas. Não pressupor que todos os sistemas existentes serão eliminados.

### C — Combinar
**O que podemos combinar com outra ideia ou recurso?**

**R:** Combinar agenda, mural, tarefas, checklist, acompanhamento de etapas, gamificação e assistente contextual. O calendário mostra **quando**; o plano de etapas mostra **como**; a gamificação incentiva **continuar**.

### A — Adaptar
**Existe algo de outro contexto que podemos adaptar?**

**R:** Sim. Adaptar **quadros de tarefas de projetos**, trilhas de aprendizagem e indicadores de progresso para a rotina escolar. Um trabalho longo pode ser dividido como um pequeno projeto, com etapas e entregas intermediárias pessoais.

### M — Modificar
**O que podemos aumentar, diminuir ou modificar?**

**R:** Diminuir a complexidade da interface e o volume de alertas. Aumentar a clareza das prioridades e o feedback visual. Separar os perfis de aluno, professor e administrador conforme suas necessidades; mostrar apenas recursos relevantes a cada perfil.

### P — Propor outro uso
**A solução poderia servir para outra finalidade?**

**R:** Além da gestão de prazos, pode apoiar revisão de conteúdos, preparação para avaliações e organização de projetos em grupo. Em outras fases, poderia ser adaptada a cursos livres e capacitações profissionais.

### E — Eliminar
**O que podemos retirar e ainda manter a solução funcionando?**

**R:** Reduzir notificações redundantes, telas pouco utilizadas e cadastros repetitivos. Evitar depender de grupos de mensagens para acompanhar prazos. Manter integrações futuras como possibilidade, sem prometer a extinção de WhatsApp, calendários ou sistemas acadêmicos.

### R — Reorganizar
**O que aconteceria se mudássemos a ordem ou a lógica?**

**R:** Em vez de abrir diretamente um calendário cheio de datas, o aluno primeiro vê **o que precisa da sua atenção hoje**. Depois acessa os detalhes, organiza o tempo e acompanha as etapas. O professor primeiro vê o panorama da turma e depois gerencia uma atividade específica.

---

## Etapa 5 — O surgimento do “E se...?”

### E se o usuário nunca recebesse notificações?
**R:** O painel inicial continuará exibindo as prioridades e os prazos. As atividades previamente salvas estarão disponíveis localmente. O aluno poderá configurar lembretes internos; notificações automáticas fora do aplicativo dependerão de permissões e suporte técnico do navegador/dispositivo.

### E se o sistema tivesse que aprender com o comportamento do usuário?
**R:** Em uma primeira versão, regras transparentes podem considerar quantidade de pendências, frequência de conclusão, prazos e tempo estimado para sugerir prioridades. Aprendizado de máquina ou IA personalizada será uma evolução futura, condicionada a consentimento, privacidade e validação. Não afirmar que um protótipo com respostas simuladas já “aprende”.

### E se dois alunos pudessem se ajudar pelo sistema?
**R:** Uma comunidade por turma permite discutir dúvidas e compartilhar orientações. Para o protótipo local, publicações e respostas podem ser demonstrativas, armazenadas no mesmo dispositivo/navegador. Conversas reais entre dispositivos exigirão backend, autenticação e moderação.

### Novos cenários para testar a proposta

**E se o aluno tiver cinco atividades acumuladas?**

**R:** O sistema apresenta um **Plano de Recuperação**, priorizando as tarefas com prazos mais próximos e maior esforço pendente. O plano é uma sugestão pessoal, não altera datas oficiais.

**E se o professor alterar um prazo enquanto o aluno estiver offline?**

**R:** O dispositivo preserva a última versão sincronizada e informa quando ela foi atualizada. Ao retornar a conexão, uma implementação com servidor precisará reconciliar mudanças e apresentar o prazo atualizado.

**E se o aluno não souber por onde começar?**

**R:** Um botão como **“Meu próximo passo”** destaca uma ação pequena e concreta. Esse recurso essencial deve funcionar por regras locais, mesmo sem IA externa.

**E se o usuário possuir alguma necessidade de acessibilidade?**

**R:** Recursos importantes devem estar disponíveis na experiência básica: contraste, teclado, feedback textual, foco visível, compatibilidade com leitores de tela e respeito às preferências de movimento reduzido.

---

## Etapa 6 — Protótipo de baixa fidelidade

**Orientação do exercício:** transformar a ideia em algo compreensível, apresentando **PROBLEMA → INSIGHT → IDEIA → FUNCIONAMENTO → DIFERENCIAL**. Na atividade original, são sugeridas de 3 a 5 telas e não é necessário programar. Uma demonstração digital funcional mais completa será preparada posteriormente para o pitch.

### PROBLEMA
Os alunos perdem ou adiam trabalhos, avaliações e atividades, mesmo já tendo acesso a agendas, mensagens e sistemas acadêmicos. A informação dispersa e a falta de apoio para executar as tarefas dificultam o acompanhamento dos prazos.

### INSIGHT
**Saber o prazo não é suficiente. É preciso transformar cada responsabilidade em um próximo passo claro, realizável e acompanhado.**

### IDEIA
Uma **plataforma inteligente de acompanhamento acadêmico**, centrada no aluno, que reúne responsabilidades escolares em um único ambiente, ajuda a priorizá-las, divide projetos em etapas, oferece recursos de estudo e reconhece o progresso por gamificação. Professores dispõem de ferramentas complementares para comunicar atividades e acompanhar entregas.

### FUNCIONAMENTO — jornada principal
1. O professor cadastra uma atividade com descrição, disciplina, prazo e orientações.
2. O aluno encontra a atividade em seu painel com uma prioridade indicada.
3. O aluno visualiza ou cria subtarefas para organizar a execução.
4. Conforme conclui etapas, a barra de progresso e a pontuação são atualizadas.
5. Caso acumule atividades, pode usar o Plano de Recuperação para reorganizar seu planejamento pessoal.
6. Sem conexão, mantém acesso às informações anteriormente armazenadas e registra progresso localmente.
7. Quando houver backend e sincronização na versão real, alterações pendentes poderão ser enviadas e comunicados novos recebidos.

### DIFERENCIAL
A plataforma não se limita a informar **“o que vence”**. Ela destaca **“o que fazer agora”**, acompanha a execução e estimula a constância. As funções essenciais de organização não precisam depender de IA conectada.

### Cinco telas recomendadas para o exercício de baixa fidelidade

1. **Entrada / seleção de perfil:** acesso demonstrativo de aluno e professor; experiência simples.
2. **Dashboard do aluno:** prioridades do dia, próximos prazos, progresso e chama de evolução.
3. **Detalhe da atividade:** instruções, data, checklist de etapas, acompanhamento e botão “Meu próximo passo”.
4. **Plano de estudo e recuperação:** visão das pendências e sugestões de reorganização.
5. **Painel do professor:** publicação de atividades e acompanhamento básico da turma.

### Escopo sugerido do futuro protótipo funcional local para pitch

**Perfil do aluno — núcleo obrigatório:** dashboard, calendário, tarefas e subtarefas, filtros de urgência, progresso, pontos/conquistas, notas, tour acessível e dados persistidos após atualização da página.

**Perfil do professor — complementar:** criação/edição de atividades, associação a turma/disciplina, comunicados, prazos e acompanhamento demonstrativo das entregas.

**Perfil do administrador — demonstração opcional:** organização de turmas, disciplinas e perfis com dados locais; não equivale a controle real de acesso.

**Diferenciais demonstráveis, se houver tempo:** assistente contextual **simulado e identificado**, Plano de Recuperação, quiz local, comunidade local demonstrativa e alternância de modo offline.

**Não prometer como implementados nesta etapa:** autenticação segura, sincronização real entre dispositivos, notificações externas garantidas, mensagens reais entre usuários, IA generativa treinada com dados de cada aluno ou totem físico integrado.

### Direção técnica para um futuro prompt de prototipagem (não é o prompt)

- **Interface:** React, TypeScript, Tailwind CSS, componentes reutilizáveis e layout responsivo, priorizando mobile.
- **Navegação:** React Router ou equivalente.
- **Dados:** IndexedDB preferencialmente para entidades; localStorage para configurações leves.
- **Demonstração:** base de dados fictícia coerente, com turmas, docentes, disciplinas e atividades; ações com efeitos reais sobre o estado local.
- **Persistência:** tarefas, progresso, pontos, notas e preferências preservados entre sessões no navegador.
- **Acessibilidade:** labels, navegação por teclado, contraste, responsividade e mensagens claras.
- **Transparência:** sinalizar funções simuladas em vez de apresentá-las como integrações reais.

### Roteiro de demonstração para o pitch

**Problema → Centralização → Próximo passo → Progresso gamificado → Simulação de falta de conexão.**

A apresentação pode demonstrar a criação de uma tarefa pelo professor, sua visualização no perfil do aluno, a conclusão de uma etapa e a atualização do progresso. Esse encadeamento prova mais do que uma sequência de telas estáticas, respeitando os limites de uma demonstração local.

### Indicadores para validar posteriormente com usuários reais

- Percentual de atividades concluídas dentro do prazo.
- Quantidade de atrasos por período.
- Percentual de tarefas iniciadas antes do dia do vencimento.
- Facilidade de uso relatada por alunos e docentes.

> **Observação:** esses indicadores são métricas propostas para estudos futuros. Não há resultados medidos no documento original.

---

## Situação-problema (enunciado original preservado ao final)

Uma escola técnica percebeu que muitos alunos estão perdendo prazos de trabalhos, avaliações, atividades e entregas de projetos.

A primeira ideia da direção foi criar “mais um aplicativo de agenda”. Porém, os alunos afirmam que já existem agendas, calendários, grupos de WhatsApp e sistemas acadêmicos — e mesmo assim continuam esquecendo ou adiando tarefas.

A equipe de Desenvolvimento de Sistemas recebeu o desafio:

**Como poderíamos criar uma solução que realmente ajudasse os alunos a organizar suas responsabilidades, sem simplesmente criar mais uma agenda ou lista de tarefas?**

Existe uma condição: a solução precisa apresentar pelo menos um elemento que vocês considerem diferente das soluções tradicionais.

---

**Síntese do posicionamento:** *De uma lista de prazos para uma jornada guiada de execução acadêmica.*
