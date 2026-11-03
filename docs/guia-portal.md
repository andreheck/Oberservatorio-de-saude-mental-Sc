# Observatório de Saúde Mental (Sul do Brasil) — guia operacional

## O que esta versão entrega

O portal tem navegação pública responsiva pelos módulos solicitados, busca de módulos e registros publicados, panorama, dashboard financeiro, mapa geográfico interativo, guia cidadão sobre as seis modalidades CAPS, páginas de metodologia e comissão, registros de solicitações e inspeções, documentos e gestão autenticada. Os registros municipais começam vazios: não foram inventados serviços, pessoas, protocolos, inspeções, bairros, recursos ou resultados.

O mapa usa Google Maps JavaScript via proxy gerido, com lista textual, zoom, filtros e busca de unidade/rua/bairro. Exibe um snapshot versionado, cruzado por endereço com o CNES consultado em 20/10/2026: 17 das 32 UBS listadas e um CAPS II. Marcadores identificam pontos cadastrais e não confirmam funcionamento, horário ou oferta. CAPSi e CAPS AD com endereços divergentes não recebem marcador/rota; o botão de mapa de calor permanece desativado por falta de dados territoriais agregados validados. A pessoa pode pedir geolocalização ao navegador e ver distância reta calculada localmente, sem guardar ou enviar a posição ao portal; a navegação externa para o Google Maps é separada e acompanhada de aviso. Não há limites oficiais de bairros integrados nem conclusão de desassistência por ausência de ponto. O guia usa orientação geral do Ministério da Saúde, consultada em 19/10/2026; não transforma publicações municipais antigas em prova de funcionamento atual.

A gestão usa autenticação real Manus OAuth. O proprietário do projeto, identificado pela plataforma, recebe o papel administrador; não existe senha de demonstração nem promoção automática do primeiro visitante. Os procedimentos do servidor aplicam papéis editoriais. Novos registros são rascunhos, e a publicação passa por revisão e aprovação. A mudança de conteúdo de um registro publicado exige despublicação explícita com justificativa, seguida de novo fluxo. O histórico administrativo preserva valores anteriores e novos.

Solicitações, inspeções, ações, membros, profissionais agregados, documentos, orçamento e eventos usam um cadastro inicial com campos essenciais e dados estruturados. Esta não é ainda a implementação integral dos centenas de campos especializados dos anexos: o detalhamento avançado continua no backlog. As fichas públicas apresentam metadados, fontes e histórico. Prazos são tratados com cautela e não se afirma ausência de resposta do órgão a partir de lacuna do portal.

O dashboard distingue anúncio, dotação inicial, orçamento autorizado, transferência, empenho, liquidação, pagamento, restos a pagar e contrapartida. Existem filtros básicos por texto, ano e esfera, registros detalhados, CSV com valores/etapas/ano/esfera/identificadores e impressão pelo navegador, que permite salvar PDF. Bases ausentes não geram séries ou valores estimados. Séries comparáveis, composição de despesas e filtros financeiros avançados precisam de evolução e fontes validadas. PDF nesta versão significa impressão/salvar como PDF do navegador, não geração assíncrona de relatório analítico.

## Entrar e administrar

Abra “Área de gestão” na navegação ou a rota `/admin`. Clique em “Entrar com Manus”. A aplicação exige uma sessão validada; a conta autenticada sem atribuição editorial não ganha acesso a dados internos ou permissão de publicar. O proprietário usa “Permissões e auditoria” para atribuir papel a pessoas que já tenham iniciado sessão: Administrador, Editor, responsável financeiro, responsável por inspeções, responsável por documentos, Revisor, Leitor interno ou CISM. O papel CISM é concedido manualmente após confirmação administrativa; entrar no portal não cria essa autorização. A área `/cism` é somente de leitura e não concede gestão, edição, publicação, auditoria ou administração de usuários.

Para cadastrar, escolha o módulo e clique em “Novo registro”. Informe título, descrição e situação de acompanhamento. Preencha fonte, URL documental, período e data de verificação antes de solicitar aprovação. Preencha os campos específicos disponíveis. Nos serviços, confirme documentalmente endereço, localização e funcionamento, e informe latitude/longitude para aparecerem no mapa. Nas ações concluídas, informe a evidência de execução. Para prazos, registre data de envio, vencimento, fundamento e termo inicial, e confirme que os elementos foram verificados.

“Salvar rascunho” persiste o registro na base gerida, não no navegador. “Enviar à revisão”, “Aprovar” e “Publicar” correspondem a etapas distintas. Editores e responsáveis especializados não aprovam ou publicam; os responsáveis ficam limitados ao seu domínio. A revisão institucional deve verificar qualidade, direitos de acesso, privacidade e documentação. Antes de alterar registro publicado ou adicionar evento, use despublicação com justificativa; depois do ajuste, execute novo fluxo de revisão.

“Registrar evento” adiciona data, descrição e atribuição institucional genérica ao histórico público. A identidade individual do usuário fica restrita à auditoria administrativa, sem publicação automática do nome pessoal do OAuth. O portal não recebe denúncias, prontuários ou relatos clínicos identificáveis. Use descrição institucional objetiva. Nomes de usuários da rede não devem ser registrados ou publicados.

Em “Identidade do portal”, o administrador pode alterar nome, subtítulo, assinatura e e-mail institucional para correções. O contato só aparece como canal utilizável depois de configurado. O portal não atende urgências; orienta buscar o SUS, e o guia apresenta SAMU 192 segundo a fonte nacional.

## Documentos e acesso

“Documentos privados” aceita PDF, PNG, JPEG e TXT de até 5 MiB. O servidor verifica autorização, tamanho e assinatura básica do formato. Os bytes são guardados em base de dados, e não em URL pública de objetos. Essa decisão evita exposição de originais em revisão. A checagem de assinatura não equivale a antivírus ou sanitização completa; a instituição deve revisar os arquivos antes da divulgação.

O upload não publica o arquivo. A listagem interna permite baixar o original autorizado e controlar o fluxo de revisão. Cada arquivo possui escopo `public` ou `cism`. Visitantes só baixam arquivos publicados com escopo público; membros CISM só recebem metadados e downloads de arquivos explicitamente publicados para CISM. Rascunhos/revisões não aparecem na área de membros; os procedimentos do servidor validam o papel em cada listagem e download. Um registro do módulo documentos pode usar o ID do arquivo para relacionar metadados e original. O gerenciamento completo de versões, classificação de sigilo, vínculo múltiplo, retenção e antivírus é evolução pendente.

## Importação e atualização manual

A importação aceita CSV UTF-8 com separador vírgula ou ponto e vírgula, aspas e cabeçalho, até 1 MiB e 100 linhas. `title` e `description` são obrigatórios. Outros cabeçalhos: `module`, `status`, `sourceName`, `sourceUrl`, `referencePeriod`, `verifiedAt` e `data`. O campo `data` pode conter JSON dos campos específicos do módulo. As linhas são salvas sequencialmente como rascunhos. Se houver erro, a interface informa o número já importado e conserva as linhas restantes para correção, não finge importação integral.

Antes de importar, verifique autorização de uso, período, unidades, definição de indicadores e duplicações. Não reimporte indiscriminadamente os mesmos lançamentos. A versão não possui integração automática ativa com CNES, DATASUS, FNS, SIOPS, PNCP ou portais de transparência. Não foi presumida a existência de API ou permissão de extração. Planilhas XLSX devem ser exportadas para CSV: o leitor nativo de XLSX ainda não está implementado.

## Arquitetura e dicionário inicial

React 19/TypeScript, Vite, Express, tRPC e Drizzle sobre MySQL gerido do Manus. Frontend e API são servidos na mesma origem, porta de desenvolvimento 3000; container de produção honra `PORT`. Arquivos de aplicação não contêm credenciais; `DATABASE_URL` e segredos de sessão são fornecidos no ambiente. Cookie de aplicação `webdev_app_session`, HttpOnly, Secure, SameSite=None, compatível com Preview HTTPS integrado.

`users` armazena identidades autenticadas, papel base e datas. `userPermissions` liga usuário a papéis editoriais ou ao papel restrito `cism_member`. `portalSettings` mantém identidade do portal e contato. `portalRecords` mantém ID, módulo, título, descrição, situação de acompanhamento, estado editorial, fonte, URL, período, verificação, dados estruturados, criador/atualizador e datas. `portalEvents` relaciona recordId, data do evento, descrição, autor e documento. `portalAudit` conserva registro, autor, ação, justificativa, valores anteriores/novos e data. `portalDocuments` mantém original base64, MIME, tamanho, título, estado de publicação, escopo `public|cism`, carregador e datas.

Os campos estruturados dos módulos incluem `modality`, `address`, `neighborhood`, `latitude`, `longitude`, `phone`, `hours`, `audience`, `access`, `addressVerified`; `sentAt`, `responseAt`, `deadlineAt`, `deadlineBasis`, `deadlineVerified`; `scope`, `objective`, `methodology`, `recommendations`; `stage`, `amount`, `year`, `sphere`, `financialIdentifier`; `evidenceUrl`; e `documentId`. Datas de entrada usam ISO 8601, dinheiro deve ser informado em reais e quantidades em unidade documentada. Nenhum texto livre substitui a verificação da fonte.

Esta estrutura possui relacionamentos entre usuário, registro, evento, documento e auditoria, mas usa JSON para a especialização inicial dos módulos. A normalização integral em entidades próprias para bairros, órgãos, indicadores, equipamentos, força de trabalho, instrumentos e recomendações ainda é evolução. O esquema atual é uma base persistente de MVP, não um modelo completo final.

## Metodologia dos indicadores

Contagem de registros publicados descreve o acervo do portal, não toda a oferta municipal. Nenhum acervo vazio deve aparecer como “zero serviços existentes”. Cada módulo distingue inexistência de registro de ausência de atendimento. Valores financeiros só são somados na mesma etapa e ano, com identificadores presentes e únicos. Lançamentos sem ano documentado não entram no exercício selecionado; ausência ou repetição de identificador bloqueia o agregado. Os totais descrevem registros identificados e não representam automaticamente o orçamento municipal integral. A conciliação de duplicações entre fontes com identificadores diferentes ainda requer validação externa. Transferência não deve ser somada à despesa que financiou.

Tempo de solicitação usa dias civis UTC entre envio e resposta registrada ou data atual. Dias restantes só são apresentados com prazo, fundamento e envio verificados. A interpretação jurídica depende da regra aplicável e de verificação externa sobre resposta/termo inicial. Sem evidência suficiente, o estado de atraso legal permanece não verificável. Tempos de espera assistencial, pessoas únicas, ocupação e capacidade não são calculados sem bases e denominadores oficiais.

## Operação, backups e restauração

Desenvolvimento e publicação compartilham a mesma base gerida. Não use a base para testes destrutivos ou cadastros fictícios públicos. As migrações devem ser determinísticas e aditivas; mudanças destrutivas exigem avaliação, cópia e autorização explícita. O container não é local para dados duráveis; os registros e documentos desta versão estão no banco.

Não foi configurado backup automático externo, retenção formal ou procedimento de restauração ensaiado. Antes de operação institucional, definir responsável, periodicidade, armazenamento cifrado, acesso e testes de recuperação. O CSV público é exportação de registros publicados e não equivale a backup integral de banco, auditoria ou arquivos internos. O código e migrações são preservados na versão gerida do projeto; não pressupor que a plataforma ofereça restauração pontual de dados.

## Backlog e dependências

Ainda dependem de dados e validação: cadastro operacional atual de serviços/CNES, endereços/horários, força de trabalho, capacidade/demanda/espera, composição autorizada da CISM, histórico de atos e inspeções, protocolos, orçamento e instrumentos financeiros, limites oficiais de bairros e e-mail institucional.

Ainda dependem de implementação adicional: todos os campos especializados completos, relações normalizadas extensivas, filtros avançados, deduplicação de lançamentos por base externa, gráficos históricos e composição com compatibilidade metodológica, métricas reais de capacidade por período/unidade, importação XLSX, rotinas automáticas verificadas, versões completas de anexos, notificações, antivírus, política formal de retenção, backup/restauração e auditoria institucional de acessibilidade e segurança. Não se afirma conformidade WCAG 2.2 AA ou LGPD certificada: foram aplicadas práticas iniciais de teclado, foco, rotulagem, contraste e privacidade, mas resta avaliação especializada.

## Publicação

O Preview permite utilizar a aplicação antes da publicação. A versão gerida é salva por checkpoint no repositório canônico; publicar é uma operação separada que compila o Dockerfile. Só considerar endereço permanente disponível após confirmação de sucesso de publicação. O administrador acessa a rota `/admin` no endereço publicado e entra com sua conta; nenhum segredo precisa ser entregue por chat.

## Fontes

Orientação atual sobre CAPS: https://www.gov.br/saude/pt-br/composicao/saes/desmad/raps/caps, consulta 19/10/2026. As fontes municipais históricas e motivos de não utilizá-las como cadastro atual constam em `docs/fontes-caps.md`. Requisitos integrais preservados em `docs/requisitos-portal.txt` e `docs/requisitos-caps.txt`.


## Centro de dados municipal — aditivo de 19/10/2026

A rota `/dados-da-cidade` apresenta o perfil de Itajaí a partir de IBGE Cidades/SIDRA, população por grupos quinquenais do Censo 2022, estimativa populacional IBGE 2026 (302.247, referência 01/07/2026), indicadores gerais de saúde e uma fotografia de outubro de 2026 do painel municipal. Estimativa e Censo são medidas diferentes; só a distribuição etária do Censo 2022 foi usada no gráfico. As fontes, URLs, valores, períodos, unidades, consulta e limitações estão em `docs/fontes-municipio-ibge-transparencia.md`; os valores renderizados estão tipados em `shared/cityData.ts`. A exportação disponível nesta página é CSV da população por faixa etária. A soma dos 21 grupos etários do SIDRA foi comparada com o total censitário de 264.054.

O cartão “Despesas com Saúde” reproduz a fotografia resumida do Portal da Transparência, não uma apuração independente; está visualmente separado dos totais municipais. A etapa, a composição e o denominador dos 21,26% não são informados na tela consultada; o percentual não deve ser interpretado como fração das despesas liquidadas mostradas ao lado, valor pago, gasto com saúde mental ou série comparável. Receita e despesas liquidadas são totais municipais conforme os rótulos do painel. Para extrações futuras, usar a documentação de dados abertos e o FMS (código de unidade gestora 26), preservar as diferentes etapas, período e identificadores. A API REST aberta `https://portaltransparencia.itajai.sc.gov.br:443/epublica-portal/rest/itajai/api/v1/despesa` pode conter dados de favorecidos; não a importar/replicar sem reduzir e validar o necessário. A existência de despesa no FMS não prova destinação a saúde mental.

A página `/metas-saude` recebeu 18 fichas selecionadas da PAS 2026–2029 a partir do DOCX organizado enviado em 21/10/2026, com fonte primária indicada como DigiSUS Gestor e páginas do PDF anotadas. A página separa linha de base de 2025, meta de 2026 e meta do plano 2026–2029. Ela identifica esses valores como planejamento e não como execução; resultados realizados, quando obtidos, exigem fonte e evidência próprias. O primeiro PDF enviado estava vazio; o PDF-fonte original de 49 páginas ainda não foi conferido diretamente. Não acrescentar metas anuais de 2027/2028 por interpolação.


## Mapa, acesso CISM e programação — aditivo de 20/10/2026

O snapshot do mapa está em `shared/localHealthFacilities.ts`. Para atualizá-lo, consultar uma nova competência do CNES e o diretório municipal, cruzar código/endereço/latitude/longitude, verificar o campo de desativação sem confundi-lo com funcionamento, registar a data e revisar divergências. Só então alterar o snapshot versionado e executar os checks do projeto. Em 20/10/2026 havia 18 códigos mostrados (17 UBS e um CAPS II) sem motivo de desativação preenchido; isso não confirma que atendam ao público. A Prefeitura listava 32 UBS, portanto 15 endereços ainda não tinham correspondência. CAPSi e CAPS AD foram mantidos como pendências de endereço; o CAPS AD III constava como obra, não unidade ativa. A fonte detalhada e as divergências estão em `docs/fontes-mapa-cism-pas.md`.

O mapa de calor de saúde mental está desativado até surgir base pública/autorizada, agregada por território, com método, período, denominador e proteção de pequenas contagens validados. Para habilitar uma camada, revisar os recortes territoriais e os limites oficiais separadamente; não utilizar prontuário, diagnóstico, endereço pessoal ou contagem isolada que permita identificação. Localização do visitante é opcional, fica em memória e só produz distância reta no navegador; o website não pede a posição para carregar o mapa. “Abrir destino” é uma ação separada no Google Maps e apresenta aviso de privacidade. Esta versão não calcula origem digitada nem distância/tempo de rota.

Para conceder acesso à comissão, confirme a identidade institucional, peça que a pessoa autentique com a conta Manus e atribua manualmente o papel `cism_member` em “Permissões e auditoria”. No gestor documental, selecionar explicitamente o escopo CISM, concluir revisão/aprovação e publicar para membros. O membro só pode ler/baixar documentos publicados nesse escopo; não recebe permissão de editar, revisar, publicar, administrar usuários ou ver auditoria. Use o escopo restrito apenas para documentos que possam legalmente circular entre membros; não carregar prontuários ou dados clínicos identificáveis. A área fica em `/cism`; a lista anônima é bloqueada pelo servidor.

Em `/metas-saude`, manter as quatro frentes prioritárias, sem misturar as 18 fichas transcritas da PAS com as nove prioridades qualitativas do usuário. Cada ficha PAS preserva código, indicador, ações previstas, unidade, valores de 2025, 2026 e plano 2026–2029, e página citada. A fonte atual não contém realização observada. Se for acrescentado um relatório de execução, guardar período, valor, unidade, documento, evidência e data de publicação em campos separados; jamais substituir a meta planejada pelo realizado ou interpolar 2027/2028. Consultar a fonte da transcrição e a observação sobre o PDF original em `docs/fontes-mapa-cism-pas.md`.

A imagem de referência enviada está no hero em `client/public/images/collage-conversation-reference.png`. As três ilustrações complementares geradas aparecem em usos distintos: participação social e caminhos de cuidado na Home, escuta entre gerações no guia CAPS. Manter texto alternativo, contraste e composição responsiva; não apresentá-las como retratos de pessoas reais nem reutilizá-las fora desses contextos.


## Atualização de identidade e monitoramento — 24/10/2026

A marca pública exibida é **Observatório de Saúde Mental (Sul do Brasil)** e usa o logo fornecido pelo usuário. O nome não indica que haja dados de todos os estados do Sul: o recorte atualmente disponível é Itajaí/SC, e essa delimitação deve permanecer visível em páginas, metadados e futuras integrações. A assinatura institucional sobre a relação com CISM/COMUSA não equivale a representação oficial.

Na rota `/metas-saude`, as 18 fichas PAS transcritas foram reagrupadas em quatro frentes e seguem sem dados de execução. Espera pelo primeiro atendimento, continuidade após alta, PTS, satisfação, implantação do Observatório, boletins, painel e Colaboratório são prioridades a estruturar; o código 4.1.44 e a previsão “implantar 1 protocolo” foram informados pelo usuário e aguardam confirmação em documento primário. Não editar esses itens como meta oficial, resultado ou ação concluída sem fonte, definição, período e evidência aprovados. A conferência do PDF original da PAS segue pendente.


## Atualizações normativas federais — rota `/atualizacoes-normativas`

A página pública reúne seis portarias relacionadas à RAPS (10.727, 10.738, 10.732, 10.728, 10.737 e 10.747, todas de 08/04/2026) e a Portaria 9.082/2025 como contexto transversal da APS. O CONASEMS é citado como índice secundário; cada ficha liga ao texto oficial do DOU. As localidades e valores permanecem nacionais/externos a Itajaí: não converter habilitação ou valor do ato em repasse, despesa, serviço local ou conclusão de implementação. A Portaria 10.728 cita Joinville/SC, não Itajaí. A Portaria 10.725/2026 não aparece na página porque o texto oficial não foi confirmado; a limitação permanece em `docs/analise-conasems-2026-04-09.md`. Antes de adicionar ou atualizar um ato, reabrir o texto do DOU, verificar ementa e anexos, destinatário, vigência e condição financeira; registrar consulta e manter a ressalva “Contexto nacional — nenhum benefício de Itajaí identificado” enquanto o município não constar do ato.
