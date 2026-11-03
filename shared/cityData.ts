export const cityDataConsultedAt = "19/10/2026 (horário local de Itajaí)";

export const ibgeSources = {
  cityProfile: "https://www.ibge.gov.br/cidades-e-estados/sc/itajai.html",
  panorama: "https://cidades.ibge.gov.br/brasil/sc/itajai/panorama",
  sidraPopulation:
    "https://apisidra.ibge.gov.br/values/t/9514/n6/4208203/p/2022/v/93",
  sidraPopulationEstimate:
    "https://apisidra.ibge.gov.br/values/t/6579/n6/4208203/p/2026/v/all",
  populationEstimatePublication:
    "https://www.ibge.gov.br/estatisticas/sociais/populacao/9103-estimativas-de-populacao.html",
  populationEstimateDou:
    "https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2026/estimativa_dou_2026.pdf",
  sidraAge:
    "https://apisidra.ibge.gov.br/values/t/9514/n6/4208203/p/2022/v/93/c2/6794/c287/93070,93084,93085,93086,93087,93088,93089,93090,93091,93092,93093,93094,93095,93096,93097,93098,49108,49109,60040,60041,6653",
  aggregateMetadata:
    "https://servicodados.ibge.gov.br/api/v3/agregados/9514/metadados",
  sidraDocs: "https://servicodados.ibge.gov.br/api/docs/agregados?versao=3",
};

export const transparencySources = {
  home: "https://portaltransparencia.itajai.sc.gov.br/",
  detailedExpenses:
    "https://portaltransparencia.itajai.sc.gov.br/epublica-portal/#/itajai/portal/despesa/avancado/categoriaTable?entidade=411",
  expenseOpenData:
    "https://portaltransparencia.itajai.sc.gov.br/epublica-portal/#/itajai/portal/dadosAbertos/despesaView?params=%7B%22mode%22:%22INFO%22%7D&entidade=411",
  expenseApi:
    "https://portaltransparencia.itajai.sc.gov.br/epublica-portal/rest/itajai/api/v1/despesa",
};

export const cityIndicators = [
  {
    label: "População residente",
    value: "264.054",
    unit: "pessoas",
    period: "Censo Demográfico 2022",
    domain: "Demografia",
    sourceName: "IBGE · Censo 2022 / SIDRA, tabela 9514",
    sourceUrl: ibgeSources.sidraPopulation,
    note: "Contagem censitária, não estimativa atualizada para 2026.",
  },
  {
    label: "População estimada",
    value: "302.247",
    unit: "pessoas",
    period: "Estimativa 2026 · referência 01/07/2026",
    domain: "Demografia",
    sourceName: "IBGE · Estimativas de População 2026 / SIDRA, tabela 6579",
    sourceUrl: ibgeSources.sidraPopulationEstimate,
    note: "Estimativa anual (método AiBi), não contagem censitária; mantenha-a separada do Censo 2022.",
  },
  {
    label: "Área territorial",
    value: "289,215",
    unit: "km²",
    period: "2025",
    domain: "Território",
    sourceName: "IBGE · Cidades e Estados",
    sourceUrl: ibgeSources.cityProfile,
    note: "Área da unidade territorial informada pelo IBGE.",
  },
  {
    label: "Densidade demográfica",
    value: "913,00",
    unit: "hab./km²",
    period: "Censo 2022",
    domain: "Demografia",
    sourceName: "IBGE · Cidades e Estados",
    sourceUrl: ibgeSources.cityProfile,
    note: "Indicador censitário; não descreve distribuição ou acesso por bairro.",
  },
  {
    label: "PIB per capita",
    value: "R$ 182.522,93",
    unit: "por habitante",
    period: "2023",
    domain: "Economia",
    sourceName: "IBGE · PIB dos Municípios",
    sourceUrl:
      "https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9088-produto-interno-bruto-dos-municipios.html",
    note: "Estimativa econômica municipal; não equivale à renda individual.",
  },
  {
    label: "Mortalidade infantil",
    value: "11,16",
    unit: "óbitos por mil nascidos vivos",
    period: "2025",
    domain: "Saúde geral",
    sourceName: "IBGE Cidades · fonte indicada: Ministério da Saúde/DATASUS",
    sourceUrl: ibgeSources.cityProfile,
    note: "Indicador geral, não de saúde mental; conferir a nota de série da página antes de comparar anos.",
  },
  {
    label: "Internações por diarreia pelo SUS",
    value: "46,6",
    unit: "por 100 mil habitantes",
    period: "2024",
    domain: "Saúde geral",
    sourceName: "IBGE · Cidades e Estados",
    sourceUrl: ibgeSources.cityProfile,
    note: "Indicador geral de saúde; não é medida de saúde mental.",
  },
] as const;

export const populationByAge = [
  { label: "0 a 4 anos", count: 17771 },
  { label: "5 a 9 anos", count: 18312 },
  { label: "10 a 14 anos", count: 17228 },
  { label: "15 a 19 anos", count: 16931 },
  { label: "20 a 24 anos", count: 21127 },
  { label: "25 a 29 anos", count: 24478 },
  { label: "30 a 34 anos", count: 24616 },
  { label: "35 a 39 anos", count: 24280 },
  { label: "40 a 44 anos", count: 22590 },
  { label: "45 a 49 anos", count: 17141 },
  { label: "50 a 54 anos", count: 14824 },
  { label: "55 a 59 anos", count: 13221 },
  { label: "60 a 64 anos", count: 10865 },
  { label: "65 a 69 anos", count: 8164 },
  { label: "70 a 74 anos", count: 5532 },
  { label: "75 a 79 anos", count: 3303 },
  { label: "80 a 84 anos", count: 2031 },
  { label: "85 a 89 anos", count: 1089 },
  { label: "90 a 94 anos", count: 421 },
  { label: "95 a 99 anos", count: 111 },
  { label: "100 anos ou mais", count: 19 },
] as const;

export const populationTotal = 264054;

export const transparencySnapshot = {
  period: "Janeiro a outubro de 2026",
  sourceUpdatedAt: "19/10/2026 às 00:10",
  collectedAt: cityDataConsultedAt,
  revenue: "R$ 2.902.620.990,27",
  liquidatedExpenses: "R$ 2.320.634.581,31",
  healthExpenseAsDisplayed: "R$ 373,6 milhões",
  healthShareAsDisplayed: "21,26%",
  minimumShareAsDisplayed: "15,00%",
} as const;

export const mentalHealthActivitySnapshot = {
  sourceName: "Prefeitura de Itajaí · notícia sobre ações de saúde mental",
  sourceUrl:
    "https://itajai.sc.gov.br/noticias/37613/setembro-amarelo-reune-acoes-de-saude-mental-em-itajai",
  period: "Maio a agosto de 2026",
  publicationDate: "17/09/2026",
  collectedAt: "20/10/2026",
  totalRecords: 27084,
  categories: [
    { label: "Psiquiatria ambulatorial", count: 564, measure: "Atendimentos" },
    { label: "Psicologia infantil", count: 1968, measure: "Atendimentos" },
    { label: "Psicologia adulto", count: 5707, measure: "Atendimentos" },
    { label: "Clínicas de psicologia", count: 3890, measure: "Atendimentos" },
    { label: "CAPS II", count: 7127, measure: "Procedimentos" },
    { label: "CAPS AD", count: 3429, measure: "Procedimentos" },
    { label: "CAPSi", count: 2850, measure: "Procedimentos" },
    {
      label: "Outros serviços (Ceredi, CEPICS, CAID e UPAs)",
      count: 1549,
      measure: "Atendimentos",
    },
  ],
} as const;

export function buildPopulationAgeCsv(): string {
  const rows = [
    ["municipio_codigo_ibge", "municipio", "ano", "faixa_etaria", "pessoas"],
    ...populationByAge.map(({ label, count }) => [
      "4208203",
      "Itajaí",
      "2022",
      label,
      String(count),
    ]),
  ];
  return rows
    .map(row => row.map(value => `"${value.replaceAll('"', '""')}"`).join(";"))
    .join("\r\n");
}
