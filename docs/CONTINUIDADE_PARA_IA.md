# Guia de continuidade para outras IAs

**Projeto:** Observatório de Saúde Mental (Sul do Brasil)
**Recorte de dados atualmente implementado:** Itajaí/SC
**Atualizado em:** 26/10/2026
**Diretório Webdev:** `/home/ubuntu/observa`
**Resource Webdev:** `wdp_59b2e5557fe66ce127ea572f`
**Idioma público:** Português do Brasil (PT-BR)

Este é o ponto de partida para qualquer agente que retome o projeto. Leia também `README.md`, `plan.md`, `TODO.md`, `docs/guia-portal.md`, `docs/relatorio-implementacao.md` e os documentos de fontes indicados abaixo. O `TODO.md` preserva os requisitos originais extensos e seus critérios; não o substitua por uma lista resumida. Consulte o estado real do Git antes de alterar arquivos: o sandbox pode conter trabalho ainda não sincronizado.

## 1. Instruções essenciais para a próxima IA

1. Preserve alterações do usuário e de outras sessões. Antes de editar ou fazer commit, execute `git status --short --branch`, `git log -1 --oneline` e confirme o repositório remoto/canônico pelo Webdev.
2. Não execute operações de teste que escrevam/apaguem registros, anexos ou permissões: desenvolvimento e produção compartilham a mesma base MySQL gerida.
3. Mantenha visível a distinção entre **marca regional** e **recorte dos dados**, hoje restrito a Itajaí/SC. Não sugerir cobertura validada para os três estados do Sul.
4. Não invente serviços, capacidade, vagas, profissionais, resultados PAS, protocolos, inspeções, pessoas ou respostas institucionais. Ausência de dado não é zero nem prova de ausência de serviço/atendimento.
5. Não confunda metas/plano, anúncios, atos nacionais, dotação, transferências, empenho, liquidação, pagamento, implantação e resultado observado. Cada indicador exige fonte, período, unidade, método e data de verificação.
6. Proteja documentos internos e dados sensíveis. Não publique prontuários, identificadores de usuários, diagnósticos individuais, relatos clínicos ou coordenadas de pessoas. Não atribua `cism_member` sem autorização e identificação administrativa inequívocas.
7. Para qualquer rota React nova, atualize `client/public/manus-routes.json` e verifique SSR/metadados, menu, busca e links relacionados. O manifesto atual contém 24 caminhos, incluindo padrões dinâmicos.
8. Releia `/home/ubuntu/skills/webdev/SKILL.md` após troca de contexto e os guias específicos do trabalho. Para checkpoint/publish, siga `webdev/references/git-checkpoints.md`; para eventual ligação/switch GitHub, use `webdev/references/git-canonical.md` e a skill GitHub correspondente. Nunca force-push nem reescreva `main`.

## 2. Estado do projeto e infraestrutura

O portal é uma aplicação Web full-stack inicializada no template `web-db-user`, usando React 19, TypeScript, Vite, Tailwind, Express, tRPC, Drizzle ORM e MySQL gerido. O backend e a base estão habilitados. A porta de Preview configurada é 3000; produção é publicada por container e atende `/api/health`. O login utiliza a autenticação Manus existente; a aplicação mantém sessão própria `webdev_app_session`, com suporte a Preview HTTPS embutido. Não criar autenticação fictícia, usuário de demonstração, bypass por ambiente ou credenciais manuais.

Arquivos de entrada e áreas principais:

- `client/src/App.tsx`: roteamento Wouter e divisão entre a entrada independente e o shell do portal.
- `client/src/components/portal/`: navegação, layout, fontes, estados e componentes de gestão.
- `client/src/components/Map.tsx`: carregamento reutilizável da Maps JavaScript API através do proxy Manus.
- `client/src/pages/portal/`: páginas públicas e de gestão.
- `client/public/manus-routes.json`: manifesto de caminhos.
- `server/_core/`: inicialização Express, autenticação, contexto, tRPC e configuração.
- `server/routers.ts`: router raiz e exposição de `portalRouter`.
- `server/portal.ts`: consultas/mutações, papéis, fluxos editoriais, auditoria e autorização de documentos CISM.
- `server/publicSeo.ts`: rotas e conteúdo SSR para metadados públicos.
- `shared/`: tipos, conteúdo municipal, metas PAS, diretório geográfico e funções puras.
- `drizzle/schema.ts`: schema MySQL e tabelas; `drizzle/` inclui as migrações versionadas.
- `docs/`: fontes, análise normativa, guia de uso, requisitos, implementação e continuidade.
- `app.config.ts`: literal `logoUrl` da identidade visual da plataforma. A marca do site/favicon é independente desse metadado.

A configuração Webdev consultada em 26/10/2026 informou `git_repository.provider = manus` e `publishing.auto_publish = false`. Assim, push/checkpoint e publicação são ações distintas; não assumir publicação automática. O último checkpoint registrado conhecido é `291d099` (`feat: expand Itajai municipal data center`), cuja versão pública conhecida ainda usava Leaflet/OpenStreetMap. A nova implementação local inclui alterações não necessariamente contidas nesse checkpoint; confirme o SHA efetivamente aceito antes de declarar o portal atualizado. A publicação pública conhecida é `https://observa-x7fimfpb.manus.space`; só afirmar que contém uma versão nova após a confirmação positiva de publicação.

O conector GitHub da sessão foi encontrado **desativado** em 26/10/2026. A configuração exibiu que a proposta para habilitá-lo não foi aceita, e não existe espelho GitHub legado configurado. O projeto não foi transferido para GitHub; o repositório canônico permanece Manus. A cópia desejada pelo usuário é `andreheck/Oberservatorio-de-saude-mental-Sc`. Não obter nem pedir token/senha por chat, não trocar o repositório canônico, não usar credenciais fora do escopo, `gh auth login`, `origin` ou outro mecanismo para contornar a conexão desabilitada. Retomar a exportação apenas depois de a autorização apropriada estar ativa e após reler a skill GitHub e o contrato Webdev aplicáveis. O arquivo local do projeto continua sendo a fonte de trabalho enquanto isso.

## 3. Identidade, escopo e direção visual

Nome aplicado: **Observatório de Saúde Mental (Sul do Brasil)**. O usuário forneceu o logotipo original, integrado à entrada, ao cabeçalho e ao favicon; o `app.config.ts` contém URL HTTPS literal para a marca da infraestrutura. A assinatura explica a relação com a CISM/COMUSA, sem declarar o portal órgão público instituído nem representante oficial.

O nome regional é identidade visual, **não** alegação de cobertura estadual/regional. Os dados, serviços georreferenciados e análises desta versão têm recorte municipal em Itajaí/SC. A direção visual aprovada é colagem editorial cívica contemporânea: fundo claro, verde-azulado `#177e76`, azul escuro, amarelo/âmbar e coral em acentos, tipografia legível, etiquetas de fonte/período e elementos de papel. Foram integradas três ilustrações editoriais distintas e arte fornecida pelo usuário; imagens ilustrativas não representam usuários, profissionais nem membros reais. Animações são discretas e devem respeitar `prefers-reduced-motion`. Acessibilidade deve continuar em evolução: não declarar conformidade WCAG 2.2 AA certificada sem auditoria especializada.

A rota `/` é uma tela de entrada independente com marca e botão para `/inicio`; não é login nem bloqueio. A Home de panorama fica em `/inicio`.

## 4. Rotas e páginas atualmente declaradas

`App.tsx` contém ou encaminha os caminhos abaixo. `manus-routes.json` é a referência declarativa a conferir depois de qualquer alteração:

| Rota | Responsabilidade / componente |
| --- | --- |
| `/` | Entrada visual independente — `Welcome.tsx` |
| `/inicio` | Panorama — `Home.tsx` |
| `/dados-orcamento` | Orçamento — `Budget.tsx` |
| `/dados-da-cidade` | Dados oficiais de Itajaí — `CityData.tsx` |
| `/mapa-raps` | Diretório/mapa — `RapsMap.tsx` |
| `/metas-saude` | PAS 2026–2029 — `HealthPlan.tsx` |
| `/atualizacoes-normativas` | Atos federais como contexto nacional — `NormativeUpdates.tsx` |
| `/profissionais` | Força de trabalho agregada — `ModulePage.tsx` |
| `/fiscalizacoes` | Inspeções e recomendações — `ModulePage.tsx` |
| `/solicitacoes` | Demandas e prazos — `ModulePage.tsx` |
| `/acoes-executivo` | Ações do Executivo — `ModulePage.tsx` |
| `/comunidades-terapeuticas` | Registros públicos de parcerias — `ModulePage.tsx` |
| `/timeline` | Linha do tempo — `ModulePage.tsx` |
| `/bairros` | Informação territorial — `ModulePage.tsx` |
| `/comissao` | Contexto CISM/COMUSA — `ModulePage.tsx` |
| `/cism` | Área reservada de documentos CISM — `CismArea.tsx` |
| `/documentos` | Biblioteca pública — `ModulePage.tsx` e componentes de documento |
| `/publicacoes` | Conteúdo editorial — `ModulePage.tsx` |
| `/guia-caps` | Orientação cidadã — `CapsGuide.tsx` |
| `/guia-caps/:slug` | Modalidade CAPS — `CapsGuide.tsx`; slugs vêm de `shared/portal.ts` |
| `/metodologia` | Metodologia e contato — `Methodology.tsx` |
| `/admin` | Gestão autenticada — `Admin.tsx` |
| `/registro/:id` | Detalhe público de registro — `Detail.tsx` |
| `/busca` | Busca de registros — `Search.tsx` |

Os módulos de `shared/portal.ts` também alimentam menu e páginas genéricas. A rota normativa foi adicionada ao menu, Home, busca, SSR e manifesto. Manter navegação e títulos/metadados coerentes.

## 5. Conteúdo e integridade dos dados

### PAS 2026–2029

Fonte tipada: `shared/healthPlanGoals.ts`; interface: `client/src/pages/portal/HealthPlan.tsx`; documentação de origem e ressalvas em `docs/fontes-mapa-cism-pas.md`. A interface contém **18 fichas** (16 do objetivo 1.3 e duas do objetivo 2.1) e **nove prioridades complementares** indicadas pelo usuário, organizadas nas quatro frentes: expansão da rede; acesso/continuidade; qualidade; informação pública. A frente “Informação pública” ainda não tem ficha PAS quantitativa. A distribuição atual é 8 fichas em expansão, 3 em cuidado territorial/continuidade e 7 em qualidade/inclusão/prevenção; veja os agrupamentos tipados antes de reclassificar.

Cada ficha preserva código, unidade, linha de base 2025, meta de 2026, alvo do plano 2026–2029, ações e página indicada. A fonte disponível foi o DOCX organizado enviado em 21/10/2026, que indica a PAS no DigiSUS como fonte primária e aponta páginas de um PDF de 49 páginas. O PDF ainda **não foi conferido diretamente**; o anexo inicial homônimo recebido tinha 0 bytes. Não inventar valores de 2027/2028, meta final ausente, responsável ou execução; “Realizado: Não informado nesta fonte”. Prioridades sem fonte oficial, período, definição ou valor ficam como “Não informado · aguardando fonte, definição e período”. A previsão “implantar 1 protocolo” no código 4.1.44 e sua descrição são informação fornecida pelo usuário, não meta oficial conferida.

A página também apresenta totais gerais da PAS reportados pela Prefeitura (124 alcançadas; 94 parcialmente alcançadas; 132 não alcançadas ou em análise) como contexto do conjunto da Saúde no 2º quadrimestre, não como situação das 18 metas de saúde mental. A notícia sobre CAPS AD III em construção é contexto datado, não comprovação de entrega, funcionamento, despesa ou meta cumprida.

### Mapa RAPS

`shared/localHealthFacilities.ts` guarda snapshot versionado, não uma consulta CNES automática. A revisão de 20/10/2026 cruzou **18 pontos cadastrais: 17 UBS e um CAPS II** usando o diretório municipal e o arquivo CNES. Cruzamento de endereço/registro não confirma funcionamento, horário, acessibilidade, capacidade ou oferta atual; o campo de desativação em branco não prova operação. Os endereços do CAPSi e CAPS AD têm divergências entre fontes e foram deixados sem marcador/rota atual até reconfirmação. A Prefeitura informa três CAPS existentes em publicação oficial, mas endereços/funcionamento individuais permanecem sujeitos a verificação atual.

O mapa usa Google Maps JavaScript pelo proxy Manus; não colocar API key direta nem trocar o proxy por biblioteca diferente. O Preview HTTPS já carregou tiles e marcadores em teste anterior. A versão pública anterior usa a integração antiga; a produção só pode ser considerada validada depois de publicar a nova versão e testar o domínio publicado. Geolocalização requer ação/permissão explícita, é processada em memória no dispositivo, distância é linha reta calculada localmente e deve ser apresentada como estimativa (não rota). Há alternativa por lista/filtros. A navegação externa requer ação do visitante. Heatmap está **desativado**: não existem dados agregados territoriais de saúde mental com unidade espacial, período, definição, denominador e método compatíveis; totais municipais não podem ser repartidos por bairro.

### Dados municipais

Fontes e código: `shared/cityData.ts`, `docs/fontes-municipio-ibge-transparencia.md`. A série local agrega números de atendimentos/procedimentos publicados pela Prefeitura para maio–agosto de 2026; não equivale a pessoas únicas, prevalência, demanda reprimida, capacidade, cobertura territorial ou execução da PAS. O perfil inclui IBGE, mas separa Censo 2022 e estimativa 2026; a estimativa (302.247, ref. 01/07/2026) não deve ser somada nem confundida com a população censitária de 264.054. Métricas gerais de saúde não são indicadores de saúde mental.

O snapshot do Portal da Transparência é uma fotografia histórica, com limitações próprias e data de consulta. Não tratar a rubrica geral “Despesas com Saúde” como despesa de saúde mental. A função Saúde/FMS não prova destinação; não misturar valor anunciado, orçado, transferência, empenhado, liquidado, pago ou restos a pagar; não somar transferência ao gasto que financiou nem duplicar etapas. Identificadores pessoais/favorecidos brutos da API não devem ser publicados.

### Atos nacionais

`NormativeUpdates.tsx` reúne seis portarias federais da RAPS de 08/04/2026 (10.727, 10.738, 10.732, 10.728, 10.737, 10.747) e a Portaria 9.082/2025 como contexto transversal de APS, cada qual com link do DOU. O boletim CONASEMS de 09/04/2026 foi índice secundário. Os atos selecionados não identificam benefício/serviço municipal para Itajaí; Joinville/SC não é Itajaí. Valores de portaria não comprovam repasse, pagamento, liquidação, implantação ou funcionamento. A Portaria 10.725/2026 não foi publicada na página porque o texto oficial não estava confirmado. Não transformar atos nacionais em resultados locais.

## 6. Persistência, API, papéis e área CISM

O schema Drizzle efetivo está em `drizzle/schema.ts`:

- `users`: identidade Manus, papel de starter, metadados de login.
- `userPermissions`: associação de usuário a papéis do portal.
- `portalSettings`: nome, subtítulo, assinatura e contato.
- `portalRecords`: registros tipados por módulo em campos comuns + JSON `data`, fonte, período, situação editorial, autores e timestamps.
- `portalEvents`: eventos do histórico de registros.
- `portalAudit`: ações administrativas com ator, ação, motivo e valores anteriores/novos.
- `portalDocuments`: original em base64 dentro do MySQL, MIME, tamanho, estado de publicação e escopo `public` ou `cism`.

Estados editoriais: `draft`, `review`, `approved`, `published`. Papéis: `admin`, `editor`, `finance`, `inspections`, `documents`, `reviewer`, `reader`, `cism_member`. A autorização precisa ser aplicada no servidor, não apenas ocultada na interface. O papel CISM é atribuído manualmente pelo administrador a usuário já autenticado; ele não concede edição/publicação/administração/auditoria. A listagem restrita mostra materiais publicados com escopo `cism` a `admin` e `cism_member`; um membro CISM só pode baixar material CISM publicado. Separadamente, `admin`, `documents` e `reviewer` mantêm acesso interno a downloads CISM não publicados para o fluxo administrativo/de revisão; essa exceção não se estende ao papel `cism_member`. Teste apenas por leitura e contas autorizadas; não alterar permissões reais sem lista e autorização da pessoa responsável.

O router raiz fica em `server/routers.ts`; procedimentos de domínio em `server/portal.ts`. Migrações devem ser aditivas, conferidas antes de aplicar porque a base de desenvolvimento e produção é a mesma. O administrador é definido pela autorização/identidade do projeto segundo o starter; não existe senha de demonstração. O guia `docs/guia-portal.md` descreve fluxo de registro, upload, papéis, prazos e ressalvas operacionais com mais detalhe.

A administração tem fluxo editorial e controles básicos; o portal continua sendo um MVP: muitos campos especializados dos requisitos continuam agrupados em JSON/cadastro genérico. Importação disponível é CSV UTF-8 limitado; XLSX não está implementado. Integrações automáticas CNES/DATASUS/FNS/SIOPS/PNCP/Portal municipal não foram configuradas. Não prometer filas, vagas, espera, capacidade ou gráficos de série quando não há dados/metodologia.

## 7. Fontes e documentação que devem acompanhar mudanças

- `docs/guia-portal.md`: guia administrativo/técnico, limites do MVP, esquema e rotina.
- `docs/relatorio-implementacao.md`: evidências/validações de iterações já executadas; datas são históricas.
- `docs/requisitos-portal.txt` e `docs/requisitos-caps.txt`: requisitos integrais preservados.
- `docs/fontes-municipio-ibge-transparencia.md`: perfil municipal, IBGE, transparência e atendimentos.
- `docs/fontes-mapa-cism-pas.md`: CNES, divergências geográficas, PAS, heatmap, privacidade e CISM.
- `docs/fontes-caps.md`: orientação de CAPS e divergências locais.
- `docs/analise-conasems-2026-04-09.md`: pesquisa normativa e distinção nacional/local.
- `shared/cityData.ts`, `shared/localHealthFacilities.ts`, `shared/healthPlanGoals.ts`: dados tipados usados nas páginas. Mudança de dado requer atualização da procedência e ressalva correspondente.
- `TODO.md`: backlog integral e status; preserve os critérios completos. Marque concluído apenas com evidência e mantenha em aberto o que é parcial ou depende de fonte/decisão externa.

Para qualquer conjunto de dados, registre instituição publicadora, URL, data de consulta, período, unidade, método de extração, atualização, limitação e licença/condição de uso quando pertinente. Priorizem fontes primárias; mantenham link DOU para lei/norma. Se fontes divergem, documente a divergência e não selecione silenciosamente o valor conveniente.

## 8. Comandos de trabalho e validação

No projeto, os comandos usuais são:

```bash
pnpm check       # verificação de tipos
pnpm test        # testes existentes
pnpm build       # build completo (gera dist)
pnpm dev         # servidor de desenvolvimento, respeitando PORT (padrão 3000)
pnpm db:migrate  # executar migrações registradas
```

Antes de iniciar/recuperar Preview, verifique o processo existente e use `service=true` somente se for necessário iniciar o servidor; não abra o Preview por MCP. O host já registra diagnósticos TypeScript; confirmação vista: `registered: true`, idioma `typescript`. Depois de build/servidor, verificar HTTP 200 para `/api/health` e para `/manus-routes.json`; esta última resposta precisa ser o JSON real, não o fallback HTML. Compare as rotas com `App.tsx` e `manus-routes.json`. Não testar mutações/destruições na base compartilhada.

Em verificações registradas anteriormente (24–25/10), `pnpm check`, 34 testes em sete arquivos, `pnpm build` e endpoints principais passaram; houveram avisos de bundle acima de 500 kB/script de configuração da plataforma. A página normativa acrescentou a 24.ª rota ao estado atual do manifesto. **Esses resultados são evidência histórica, não certificação automática do working tree atual**: repita os comandos afetados depois de integrar a versão presente e atualize `docs/relatorio-implementacao.md` com resultados observados, data, contagem real de rotas/testes e erros/avisos relevantes.

## 9. Checkpoint, GitHub e publicação

`GET webdev.config` consultado em 26/10 indicou publicação automática desligada e repositório Manus como canônico. O usuário já solicitou, no escopo herdado, checkpoint Manus e publicação pública. Antes de um push de checkpoint: preserve todas as alterações intencionais; inspecione `git status`; atualize documentação; rode verificações; execute `git fetch origin main`; integre a versão remota sem sobrescrever nenhum lado; repita as verificações afetadas; crie commit normal e faça push para `origin/main`. Nunca `--force`, `reset --hard`, `clean`, reescrita de histórico ou push de feature branch como checkpoint. Confirme SHA/card do checkpoint retornado pela plataforma — exit zero sozinho não basta.

Como `publishing.auto_publish=false`, checkpoint não publica sozinho. Após o checkpoint existir e o usuário ter pedido a publicação (autorização herdada desta tarefa), verificar status de deployment e, se não houver deployment ativo/versão já atual, usar o fluxo MCP `POST publish`. A publicação é uma tarefa assíncrona: aguarde o resultado automático, não invente URL nem declare sucesso se o job falhar. Só então validar `https://observa-x7fimfpb.manus.space`, incluindo mapa e rotas. Não confundir Preview/compilação/checkpoint com publicação. Antes do checkpoint, manter `app.config.ts` com `logoUrl` literal HTTPS e conservar o logo fornecido.

O repositório `andreheck/Oberservatorio-de-saude-mental-Sc` é uma cópia externa desejada pelo usuário, não o repositório canônico atualmente ativo. O conector da sessão foi autorizado em 27/10/2026. A inspeção com a CLI autorizada confirmou um repositório público, branch `main`, commit inicial e apenas `README.md`; sua história é independente da história Manus. A exportação ainda não está concluída neste ponto. Integrar a história Manus pela cópia temporária, preservar o texto inicial do README e todo o conteúdo, usar merge normal sem force-push, verificar o SHA remoto e manter Manus como canônico. Não adicionar outro remote/credencial persistente ao working tree do Manus, não transferir canonicalidade e não criar novo repositório.

## 10. Pendências priorizadas e dependências do usuário

1. **Checkpoint e publicação:** concluídos para a versão `0349994c708fa2d75a478e5433051c265f4fe8c6`; publicação confirmada em `https://observa-x7fimfpb.manus.space`. Em 27/10, o mapa da página pública carregou o Google Maps, os tiles, os controles e os marcadores após a segunda visualização. Isso valida o carregamento técnico, não o funcionamento atual das unidades.
2. **Exportação GitHub:** conector autorizado em 27/10; repositório indicado existe, é público, tem `main`, um commit inicial e apenas `README.md`. História sem ancestral comum; exportação ainda precisa de merge preservador e push verificado. Não usar force-push nem confundir exportação com transferência canônica.
3. **PDF original da PAS:** localizar no DigiSUS ou em fonte municipal oficial o PDF correto de 49 páginas “Programação Anual de Saúde - 2026 edit.pdf”, confirmar município Itajaí, integridade/paginação e validar as 18 transcrições/códigos contra as páginas listadas em `shared/healthPlanGoals.ts`. O PDF recebido originalmente era 0 bytes; não usar o PDF de Rio dos Cedros. Se não houver fonte pública acessível, registrar a limitação e solicitar o documento à pessoa usuária.
4. **Heatmap:** segue desativado até uma base territorial de saúde mental pública/autorizada com unidade espacial, período, indicador, denominador, fórmula, comparabilidade e revisão de privacidade. Não interpolar totais municipais nos bairros.
5. **Acesso CISM:** o usuário precisa indicar as contas/identificadores institucionais exatos dos membros e confirmar que devem receber papel de somente leitura `cism_member`. Não atribuir papéis presumindo nomes ou endereço; admin existente faz a alteração autenticada em `/admin`.
6. **Dados e cobertura:** solicitar confirmação atual de endereços, horários, funcionamento, capacidade, equipes, espera, composição CISM e dados de orçamento/despesas específicas. Conservar cada lacuna como lacuna.
7. **Evolução do MVP:** normalização das entidades/indicadores, campos especializados de todos os módulos, filtros e séries avançadas, importação XLSX, backups/restauração documentados, retenção, varredura de malware, notificação, revisão formal de privacidade/acessibilidade/segurança e integrações verificadas permanecem no backlog de `TODO.md`/`docs/guia-portal.md`.

## 11. Critério de conclusão das próximas ações

Atualização de 27/10 registrada abaixo: inclui checkpoint, resultado/URL confirmados, verificação pública do mapa e estado do conector/repositório. Após a exportação, acrescentar o SHA GitHub e só então marcá-la concluída. Uma autorização ou card, sem push remoto verificado, não é exportação. Fechar tarefas de PAS, CISM e heatmap somente mediante confirmação/documento/base/decisão necessários — nunca por ausência de erro técnico.


## Aditivo de pesquisa PAS e estado da validação — 26/10/2026

A busca pública executada nesta retomada não localizou o PDF municipal primário de Itajaí. O painel DigiSUS acessado apresenta contagens agregadas; a linha de Itajaí na tabela de planos lista instrumentos aprovados sem detalhar o PDF da PAS 2026; o CSV por UF não baixou nesta tentativa por timeout TLS. O documento DigiSUS aberto pelo resultado de pesquisa é manual do sistema, e não a PAS; a PAS disponível na SES/SC é estadual; a PAS de Joinville é de outro município. Nenhum deles substitui a fonte de Itajaí. Os hyperlinks consultados, contexto e critérios de próximo passo estão em `docs/fontes-mapa-cism-pas.md`.

Validação do working tree em 26/10: `pnpm check` passou; `pnpm test` passou (7 arquivos/34 testes); `pnpm build` passou com avisos conhecidos sobre o script de configuração e chunk inicial >500 kB; `/api/health` e `/manus-routes.json` retornaram HTTP 200, sendo o manifesto JSON com 24 rotas únicas; cinco rotas públicas principais também responderam 200 no servidor ativo. Nenhuma gravação foi feita na base compartilhada. Estes resultados não validam a nova integração de mapa no domínio público; ela depende do checkpoint/publicação confirmados.


## Estado operacional confirmado — 27/10/2026

O checkpoint de site `0349994c708fa2d75a478e5433051c265f4fe8c6` foi publicado com sucesso; URL permanente confirmada: `https://observa-x7fimfpb.manus.space`. A verificação pública foi feita no navegador isolado. Na primeira abertura o espaço do mapa ainda estava sem tiles, mas uma segunda visualização após a conclusão do carregamento exibiu a interface Google Maps (Roadmap/Satellite e controlos), tiles cartográficos, atribuição Google e os marcadores cadastrados. O texto da própria página mantém o heatmap desativado e a ressalva de que pontos não atestam funcionamento ou cobertura. A página pública `/mapa-raps` carregou; essa observação confirma o carregamento dos recursos, não o horário, operação ou situação de cada unidade. O servidor de desenvolvimento foi reiniciado com o ambiente sincronizado e `/api/health` respondeu HTTP 200; nenhuma operação gravou na base compartilhada.

O conector GitHub foi confirmado ativo pela sessão. `gh repo view` confirmou `andreheck/Oberservatorio-de-saude-mental-Sc` como público, com branch `main`; a cópia temporária da branch contém apenas um README inicial e o commit `6da38cb819319ce2dcc12a9be9927b5c5a76c615`. A história Manus atual (`0349994c708fa2d75a478e5433051c265f4fe8c6`) não tem ancestral comum com esse commit. Neste ponto, nenhuma alteração foi enviada ao GitHub. Próximo passo: resolver a união de histórias na cópia temporária, preservando o README inicial (em especial a cautela de que o portal não é órgão formal nem representante oficial do COMUSA), testar o diff e fazer push normal para `main`; confirmar o SHA remoto antes de marcar a exportação como concluída. Não force-push.
