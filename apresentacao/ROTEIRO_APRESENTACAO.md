# Trilha — Apresentação completa

Arquivo principal: `Trilha_Apresentacao_Completa.pptx`.
Versão para leitura: `Trilha_Apresentacao_Completa.pdf`.

São 40 slides em 16:9, com textos e diagramas editáveis, capturas reais incorporadas e notas de apresentação em todos os slides. As capturas são imagens do aplicativo, não telas reconstruídas ou wireframes.

## Organização

| Slides | Conteúdo |
|---|---|
| 1–2 | Abertura e percurso pelas seis etapas |
| 3–6 | Etapa 1: situação-problema, usuários, hipóteses e insight |
| 7–13 | Etapa 2: cinco pilares, exemplos dos recursos e três diferenciais |
| 14–16 | Etapa 3: offline, gamificação funcional e simplicidade |
| 17–18 | Etapa 4: todas as letras da técnica SCAMPER |
| 19–20 | Etapa 5: cenários “E se…?” e respostas da solução |
| 21–29 | Etapa 6: jornada e telas dos módulos funcionais |
| 30–31 | Arquitetura e relacionamentos dos dados |
| 32 | Experiência mobile, tema escuro e acessibilidade |
| 33–34 | Escopo, limites demonstrativos e validação técnica |
| 35–37 | Demonstração ao vivo, indicadores futuros e fechamento |
| 38–40 | Apêndice: 22 ideias, cobertura, limites e fontes |

## Pitch curto: sequência sugerida

Para 5 a 7 minutos, apresente **1 → 3 → 6 → 13 → 21 → 23 → 25 → 30 → 34 → 37**. Use os demais slides para uma exposição completa e respostas a perguntas. No PowerPoint, é possível criar uma Apresentação Personalizada com essa seleção, sem excluir slides do arquivo.

- **Problema e insight:** aproximadamente 1 minuto.
- **Diferenciais e jornada:** aproximadamente 1 minuto.
- **Demonstração de etapas e recuperação:** aproximadamente 2 minutos.
- **Arquitetura e validação técnica:** aproximadamente 1 minuto.
- **Fechamento:** aproximadamente 30 segundos.

As notas dos slides contêm orientações de fala e cuidados específicos. Para a apresentação completa, reserve aproximadamente 20–30 minutos, conforme o nível de detalhe.

## Cuidados na apresentação

O arquivo Markdown de origem é uma proposta conceitual; o protótipo foi desenvolvido depois. As hipóteses do problema e os indicadores de impacto ainda precisam ser validados com estudantes e professores.

Os números do dashboard são dados fictícios da demonstração. Os 27 testes apresentados validam comportamento técnico, não melhoria de desempenho acadêmico. Recursos locais, integrações futuras e funcionalidades não implementadas estão diferenciados nos slides e no apêndice.

Para recarregar o aplicativo realmente sem rede, visite a versão de produção previamente e aguarde a preparação do cache PWA. O botão Simular offline demonstra o estado local e não desliga a conexão do dispositivo.

## Fontes

- `../Solucao_Academica_Etapas_Ajustadas.md`: conteúdo conceitual completo, organizado por etapas.
- `../projeto-escola/`: implementação e testes do protótipo Trilha.
- `telas/`: capturas reais dos módulos, obtidas com perfil de navegador isolado.
- `conteudo.json`: textos, referências e notas que compõem o PowerPoint.
- `validacao-apresentacao.json`: relatório de abertura, notas, imagens incorporadas e verificação de layout.

## Reprodução dos arquivos

As capturas são obtidas a partir do build já existente. Para atualizá-las, na pasta `projeto-escola`, execute `node ../apresentacao/capturar-telas.mjs` e `node ../apresentacao/captura-executavel.mjs`. Os scripts iniciam e encerram seus próprios processos locais e não alteram os dados do seu navegador pessoal.

Para gerar novamente o PowerPoint, execute `gerar-apresentacao.ps1` em uma sessão Windows com acesso ao PowerPoint instalado. A geração preserva o slide único anterior como capa, incorpora todas as imagens, exporta PDF e gera prévias na pasta `slides/`.
