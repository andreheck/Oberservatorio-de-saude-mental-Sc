# Plano de implementação — Observatório de Saúde Mental (Sul do Brasil)

## Objetivo, limites e arquitetura

Ampliar o website existente sem apresentá-lo como órgão público instituído nem como representante oficial do COMUSA. A aplicação permanece uma web app React 19, TypeScript e Vite no cliente, com Express/tRPC no servidor, Drizzle/MySQL gerido para dados duráveis e autenticação Manus OAuth já configurada. O desenvolvimento e a publicação partilham a mesma base; migrações devem ser aditivas e não se devem inserir dados demonstrativos no acervo municipal.

A expansão inclui três frentes públicas e uma restrita. O mapa usa a API JavaScript Google Maps através do proxy gerido do projeto; o diretório estático versionado em `shared/localHealthFacilities.ts` contém apenas endereços cruzados com a extração oficial do CNES e o diretório da Prefeitura. A geolocalização só é obtida após ação e permissão do navegador; a coordenada fica em memória, a distância em linha reta é calculada no cliente e existe alternativa acessível de lista/filtros. Nenhuma concentração de serviços é chamada de cobertura, necessidade ou prevalência. O mapa de calor permanece desativado até haver dados agregados/autorizados, território, período, denominador e método validados.

A área `/cism` reutiliza a sessão existente, mas requer atribuição administrativa manual do papel separado `cism_member`. O papel não concede edição, publicação, administração ou auditoria. O modelo dos documentos distingue escopo público de escopo CISM; o servidor protege o estado de autorização, a listagem e cada download. Só materiais aprovados e publicados especificamente para a comissão aparecem nessa área.

A página `/metas-saude` apresenta o recorte de saúde mental para o horizonte 2026–2029, a partir das 18 fichas transcritas do DOCX organizado pelo usuário. Não publica séries de execução sem fonte e evidência próprias. O PDF PAS municipal recebido tinha 0 bytes e ainda precisa ser conferido diretamente; não interpolar valores de 2027–2028. As notícias sobre obras/serviços são contexto datado, nunca substituto de meta, orçamento ou resultado.

## Estrutura principal do projeto

- `client/src/pages/portal/`: páginas públicas de cidade, orçamento, guia CAPS, mapa, comissão, metas e a área CISM.
- `client/src/components/portal/`: navegação/layout, fontes e estados comuns, gestão de documentos e motivos visuais de colagem.
- `client/src/components/Map.tsx`: carregador reutilizável do Google Maps com o proxy de plataforma e estado de falha.
- `client/public/`: manifesto estático `/manus-routes.json`, favicon e a referência visual fornecida pelo utilizador.
- `shared/`: contratos tipados e funções sem efeitos colaterais para catálogo municipal, dados do mapa e cálculos de distância, com testes determinísticos.
- `server/portal.ts`: procedimentos tRPC, autorização CISM, conteúdo publicado e proteção de documentos.
- `drizzle/`: schema e migrações aditivas para papel e escopo documental.
- `docs/`: requisitos originais, fontes oficiais e verificáveis, guia administrativo e relatório de implementação.

O snapshot geográfico é código versionado e atualização manual, não um ETL/API automático nem linhas persistidas na tabela municipal. Cada nova atualização precisa reconciliar cadastro e endereço, preservar data/URL de origem e ser revisada antes de publicação. A revisão do CNES de 20/10/2026 localizou os 18 códigos atualmente exibidos (17 UBS e um CAPS II), sem motivo de desativação preenchido no campo consultado; esse campo não comprova funcionamento. Endereços divergentes do CAPSi e CAPS AD foram retidos como pendência sem marcador/rota. O diretório municipal lista 32 UBS; os 15 endereços ainda sem cruzamento não são tratados como ausência de serviço.

## Direção visual aprovada

- **Movimento de design:** colagem editorial cívica contemporânea, com recortes geométricos, margens abertas, etiquetas de fonte e ritmo de página de revista; calor humano sem linguagem hospitalar genérica.
- **Princípios centrais:** rigor documental visível; dignidade e acolhimento sem estigma; acessibilidade/legibilidade em primeiro lugar; distinguir dado confirmado, divergência e informação ainda solicitada.
- **Filosofia de cor:** verde-azulado `#177e76` como assinatura de confiança e cuidado coletivo; amarelo/âmbar para caminhos e atenção; coral para acentos humanos; fundo claro e texto escuro para leitura prolongada. Cor nunca é o único código de estado.
- **Paradigma de layout:** composição editorial assimétrica: texto e imagem em proporções diferentes no hero, blocos sobrepostos e faixas informativas de largura variável. Tabelas, fontes e gráficos mantêm ordem semântica e refluem para coluna única no telemóvel; evitar um dashboard centralizado e uniforme.
- **Elementos de assinatura:** formas de papel em amarelo/coral/verde; um percurso curvo que termina numa abertura/sol; pequenos selos de fonte, período e data de atualização junto a indicadores.
- **Filosofia de interação:** revelar primeiro a pergunta pública e a qualidade do dado, depois os detalhes; mapas e filtros devem ter alternativa em lista; controles indisponíveis explicam a dependência; localização é explicitamente voluntária e efêmera.
- **Animação:** transições de interface discretas e breves, sem pulsação decorativa permanente nem movimento que atraia indevidamente a atenção; respeitar `prefers-reduced-motion` e não animar séries cartográficas como se fossem dados clínicos.
- **Tipografia:** Manrope é a fonte de interface, navegação, tabelas e títulos em hierarquia 400–800; Georgia/serif de sistema aparece apenas como contraste editorial na frase curta “Cuidado coletivo.”, nunca em números ou rótulos de gráficos. Não rasterizar texto em ilustrações.
- **Essência da marca:** observatório independente para residentes e participação social, que torna evidências municipais legíveis sem ocultar lacunas; personalidade: rigorosa, acolhedora e acessível.
- **Voz:** objetiva, cidadã e não acusatória; exemplos: “O cadastro indica um ponto, não confirma funcionamento.” e “Ainda não há dado territorial validado para esta camada.”
- **Wordmark e símbolo:** nome por extenso em Manrope com um “O” aberto atravessado por um caminho ascendente, acompanhado de recortes de papel; manter separado o ícone do site e a marca de infraestrutura WebDev.
- **Cor proprietária:** verde-azulado `#177e76`.

A imagem fornecida pelo usuário é a arte do hero “Informação pública. Cuidado coletivo.”. Três ilustrações editoriais geradas foram incorporadas em contextos separados: participação social e caminhos de cuidado na Home, e escuta entre gerações no guia CAPS. Os textos alternativos descrevem os conceitos visuais; as ilustrações não representam membros, usuários ou profissionais reais e não são repetidas em seções sem relação.

## Aditivo de 21/10/2026 — PAS 2026–2029 e tela de entrada

O DOCX organizado enviado pelo usuário informa que reúne dados da PAS de Itajaí 2026, com fonte primária indicada como DigiSUS Gestor e referências às páginas de um PDF-fonte de 49 páginas. A página `/metas-saude` exibirá 18 registros selecionados (16 do objetivo 1.3 e dois do objetivo 2.1) em três grupos: expansão de serviços, cuidado territorial/continuidade e inclusão/saúde do trabalhador/prevenção. Cada ficha preservará código, descrição/indicador, unidade, linha de base de 2025 quando disponível, meta prevista para 2026, meta do plano 2026–2029, ações e página citada. A interface chamará os valores de planejamento, não de execução; não interpolará 2027/2028 nem exibirá resultados realizados sem fonte própria. A origem será atribuída ao DOCX organizado fornecido, com link para o painel público DigiSUS e aviso de que o PDF primário não foi conferido diretamente.

A visualização será uma linha do tempo HTML acessível, com filtros pelos três grupos, valores literais e animação breve de preenchimento dos marcos. A animação será desativada quando `prefers-reduced-motion` estiver ativo; os valores e a sequência temporal continuarão legíveis sem ela. O plano não usará escalas comuns entre unidades distintas nem representará metas como progresso observado.

A rota `/` passa a apresentar uma tela de entrada independente do shell interno, com o símbolo local `/favicon.svg`, marca e botão “Acessar o observatório” para `/inicio`. O conteúdo existente de panorama muda para `/inicio`; navegação e links de retorno apontam para essa rota. As demais páginas continuam acessíveis por URL direta, e a tela de entrada não é autenticação nem bloqueio de acesso aos dados. O manifesto estático de rotas será atualizado.

## Fontes, privacidade e publicação

As fontes iniciais e divergências estão registadas em `docs/fontes-mapa-cism-pas.md`, `docs/fontes-municipio-ibge-transparencia.md` e `docs/fontes-caps.md`. Dados territoriais clínicos/pessoais não são necessários para a primeira versão: nunca plotar prontuários, diagnósticos, trajetórias ou casos identificáveis. Distâncias retas são rótuladas como estimativas; abrir navegação externa é ação do utilizador e inclui aviso sobre o fornecedor do mapa.

Metas, horários, vagas, capacidade, composição de comissão e operação de serviços exigem documento oficial/validação. Quando inexistentes, mostrar estados como “Informação solicitada”, “Aguardando confirmação” ou “Dados territoriais ainda não disponibilizados”, sem transformar ausência em zero. O manifesto de rotas deve corresponder às rotas públicas atuais; `/cism` tem conteúdo semântico sem indexação pública. Antes da entrega, executar os checks existentes, verificar as rotas e a autorização sem inserir registos fictícios na base partilhada, guardar um checkpoint canónico e publicar somente após confirmação da operação de publicação.


## Aditivo de continuidade — marca regional e quatro frentes (24/10/2026)

A marca pública solicitada passa a ser “Observatório de Saúde Mental (Sul do Brasil)”. A mudança nominal não altera automaticamente a cobertura dos dados: o produto implementado nesta etapa continua focado em Itajaí/SC, e isso deve aparecer como recorte geográfico junto aos dados e no portal. O logótipo PNG enviado em 24/10/2026 deve ser incorporado como ativo próprio do projeto e mantido acessível em tamanhos responsivos.

A página de metas deve organizar o acompanhamento em quatro frentes expressamente pedidas pelo utilizador: (1) expansão da rede; (2) acesso e continuidade; (3) qualidade do cuidado; e (4) informação pública. Reclassificar as 18 fichas PAS existentes sem alterar seus valores ou fontes. As prioridades novas — tempo de espera pelo primeiro atendimento, continuidade após alta do CAPS, PTS, satisfação das pessoas usuárias, boletins, painel de indicadores e Colaboratório — são itens de monitoramento sem base/valor/meta/documento fornecido; devem ser etiquetados como “informação/metodologia a solicitar”, nunca como resultado ou meta oficial. O código 4.1.44 refere-se ao protocolo municipal de atendimento à violência autoprovocada, abrangendo automutilação e tentativas de suicídio; o utilizador informou “implantar 1 protocolo”, sem linha de base, página de fonte primária ou meta do plano, portanto manter a procedência indicada e solicitar validação documental antes de o chamar meta oficial.

Em qualquer alteração, manter a separação de planeamento, execução e resultado, a referência PAS 2026–2029 já transcrita, o estado de conferência pendente do PDF DigiSUS e o princípio de não inventar dados.


## Estado da decisão de marca e acompanhamento — 24/10/2026

A marca pública foi atualizada para **Observatório de Saúde Mental (Sul do Brasil)**, utilizando o logo PNG enviado pelo usuário na capa, no cabeçalho e no favicon, além dos metadados da plataforma. O nome regional é marca, não alegação de abrangência: nesta etapa, os dados e equipamentos seguem com recorte municipal de Itajaí/SC. A assinatura que explica a relação com a CISM no COMUSA permanece e o portal não se apresenta como órgão oficial.

A página `/metas-saude` conserva as 18 fichas transcritas e as reorganiza em quatro frentes: expansão (8 fichas), acesso e continuidade (3), qualidade/inclusão/prevenção (7) e informação pública (0 fichas PAS quantitativas). Nove itens complementares — espera, continuidade pós-alta dos CAPS, PTS, satisfação, protocolo 4.1.44, implantação do Observatório, boletins, painel e Colaboratório — são prioridades de monitoramento indicadas pelo usuário, não metas oficiais nem resultados. A previsão informada de “implantar 1 protocolo” para 4.1.44 continua sem conferência documental, período, linha de base ou meta final. Esta revisão substitui a classificação em três grupos e a referência à antiga tela de entrada com `/favicon.svg` descritas no aditivo de 21/10; as decisões de arquitetura e a restante direção visual aprovadas permanecem.


## Aditivo de 25/10/2026 — contexto normativo nacional

A página pública `/atualizacoes-normativas` apresentará atos federais pertinentes à RAPS como contexto nacional, separados dos indicadores, serviços, finanças e resultados de Itajaí/SC. Cada cartão terá ato, data, objeto, território expressamente citado, tipo/período dos valores e URL do DOU; a origem do boletim CONASEMS será identificada como índice secundário. O conteúdo destacará que nenhuma das portarias selecionadas identifica benefício/serviço de Itajaí e que valores fixados/previstos não comprovam pagamento, liquidação ou funcionamento. A Portaria GM/MS nº 10.725/2026 fica fora da publicação até confirmação do texto oficial. A nova rota deve permanecer sincronizada entre React Router/Wouter, SSR público e `client/public/manus-routes.json`.
