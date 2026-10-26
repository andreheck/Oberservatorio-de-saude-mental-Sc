export type HealthFacilityKind =
  | "UBS"
  | "CAPS"
  | "UPA"
  | "Hospital"
  | "CIS"
  | "Acolhimento"
  | "Outro";

export type VerifiedHealthFacility = {
  id: string;
  name: string;
  kind: HealthFacilityKind;
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  cnesCode: string;
  locationNote?: string;
};

export const municipalityDirectoryUrl = "https://itajai.sc.gov.br/a/69";
export const cnesDownloadUrl =
  "https://s3.sa-east-1.amazonaws.com/ckan.saude.gov.br/CNES/cnes_estabelecimentos_csv.zip";
export const cnesCatalogUrl =
  "https://dadosabertos.saude.gov.br/dataset/cnes-cadastro-nacional-de-estabelecimentos-de-saude";
export const locationSnapshotDate = "2026-10-20";

/**
 * Endereços do diretório municipal cruzados por logradouro/número com
 * estabelecimentos ativos do arquivo CNES consultado em 20/10/2026.
 * O cruzamento confirma um ponto cadastral, não funcionamento, horário,
 * acessibilidade, capacidade ou oferta assistencial atual.
 */
export const verifiedHealthFacilities: VerifiedHealthFacility[] = [
  {
    id: "cnes-2514133",
    name: "Unidade de Saúde Centro-Vila",
    kind: "UBS",
    address: "Rua Alberto Werner, nº 333 – Vila Operária",
    neighborhood: "Vila Operária",
    latitude: -26.9098686,
    longitude: -48.6695385,
    cnesCode: "2514133",
  },
  {
    id: "cnes-2513862",
    name: "Unidade de Saúde Nancy Patino Reiser – Fazenda",
    kind: "UBS",
    address: "Rua Milton R. da Luz, nº 200 – Fazenda",
    neighborhood: "Fazenda",
    latitude: -26.9275028,
    longitude: -48.6495165,
    cnesCode: "2513862",
  },
  {
    id: "cnes-2514109",
    name: "Unidade de Saúde Vivaldo João Linhares – Praia Brava",
    kind: "UBS",
    address: "Rua Bráulio Werner, nº 124 – Praia Brava",
    neighborhood: "Praia Brava",
    latitude: -26.92766,
    longitude: -48.69559,
    cnesCode: "2514109",
  },
  {
    id: "cnes-2514168",
    name: "Unidade de Saúde Rotariano Agenor Krobel – Bambuzal",
    kind: "UBS",
    address: "Rua São Joaquim, nº 399, Loteamento Bambuzal – São Vicente",
    neighborhood: "São Vicente",
    latitude: -26.89728,
    longitude: -48.68442,
    cnesCode: "2514168",
  },
  {
    id: "cnes-2513943",
    name: "Unidade de Saúde Diva Vieira Abrantes – São João I (Policlínica)",
    kind: "UBS",
    address: "Rua Pedro Rangel, nº 130 – São João",
    neighborhood: "São João",
    latitude: -26.90052,
    longitude: -48.67898,
    cnesCode: "2513943",
  },
  {
    id: "cnes-268062",
    name: "Unidade de Saúde São João II – Padre Agostinho Staehelin",
    kind: "UBS",
    address: "Rua Juca Cesário, nº 89 – São João",
    neighborhood: "São João",
    latitude: -26.8983003,
    longitude: -48.6821726,
    cnesCode: "268062",
  },
  {
    id: "cnes-2514052",
    name: "Unidade de Saúde Evilasio Victorino – Promorar II",
    kind: "UBS",
    address: "Avenida Ministro Luiz Galloti, s/nº, Promorar II – Cidade Nova",
    neighborhood: "Cidade Nova",
    latitude: -26.92767,
    longitude: -48.6957,
    cnesCode: "2514052",
  },
  {
    id: "cnes-2514028",
    name: "Unidade de Saúde São Vicente",
    kind: "UBS",
    address: "Rua Padre Paulo Condla, nº 392 – São Vicente",
    neighborhood: "São Vicente",
    latitude: -26.90834,
    longitude: -48.69058,
    cnesCode: "2514028",
  },
  {
    id: "cnes-9836640",
    name: "Unidade de Saúde Parque do Agricultor",
    kind: "UBS",
    address:
      "Rua Mansueto Felizardo Vieira, nº 557 – Comunidade da Baía, junto ao Parque do Agricultor Gilmar Graf",
    neighborhood: "Itaipava",
    latitude: -26.968,
    longitude: -48.74878,
    cnesCode: "9836640",
  },
  {
    id: "cnes-2514141",
    name: "Unidade de Saúde Jardim Esperança",
    kind: "UBS",
    address:
      "Rua Sebastião Romeu Soares, s/nº – em frente ao Colégio Melvin Jones, Cordeiros",
    neighborhood: "Cordeiros",
    latitude: -26.8837178,
    longitude: -48.6947539,
    cnesCode: "2514141",
  },
  {
    id: "cnes-2514060",
    name: "Unidade de Saúde Rachel Dalçoquio de Borba – Espinheiros",
    kind: "UBS",
    address: "Rua Firmino Vieira Cordeiro, nº 1778 – Espinheiros",
    neighborhood: "Espinheiros",
    latitude: -26.8970459,
    longitude: -48.7299965,
    cnesCode: "2514060",
  },
  {
    id: "cnes-6889697",
    name: "Unidade de Saúde Nossa Senhora das Graças",
    kind: "UBS",
    address: "Rua Uruguai, nº 458, bloco F7 da Univali – Centro",
    neighborhood: "Centro",
    latitude: -26.9154,
    longitude: -48.664,
    cnesCode: "6889697",
  },
  {
    id: "cnes-100927",
    name: "Unidade de Saúde Fazenda e Cabeçudas",
    kind: "UBS",
    address: "Rua José Correia, nº 163 – Fazendinha",
    neighborhood: "Fazenda",
    latitude: -26.9311984,
    longitude: -48.6450245,
    cnesCode: "100927",
  },
  {
    id: "cnes-224413",
    name: "Unidade de Saúde São Judas",
    kind: "UBS",
    address: "Rua Pedro Joaquim Vieira, nº 179 – São Judas",
    neighborhood: "São Judas",
    latitude: -26.9124179,
    longitude: -48.6792772097,
    cnesCode: "224413",
  },
  {
    id: "cnes-2513927",
    name: "Unidade de Saúde Leopoldo Fischer – Brilhante",
    kind: "UBS",
    address: "Rua José Lana, nº 70 – Brilhante",
    neighborhood: "Brilhante",
    latitude: -26.9995313,
    longitude: -48.8104652,
    cnesCode: "2513927",
  },
  {
    id: "cnes-216720",
    name: "Unidade de Saúde São Pedro",
    kind: "UBS",
    address: "Rua Francisco Boaventura da Silva, nº 54 – Itaipava",
    neighborhood: "Itaipava",
    latitude: -26.9434755,
    longitude: -48.711094,
    cnesCode: "216720",
  },
  {
    id: "cnes-277762",
    name: "Unidade de Saúde São Roque",
    kind: "UBS",
    address: "Rua Domingos Rampelotti, nº 1299 – São Roque",
    neighborhood: "São Roque",
    latitude: -26.907632,
    longitude: -48.747303,
    cnesCode: "277762",
  },
  {
    id: "cnes-2744872",
    name: "CAPS II",
    kind: "CAPS",
    address: "Rua Alfredo Trompowski, nº 485",
    neighborhood: "Vila Operária (diretório municipal)",
    latitude: -26.90755,
    longitude: -48.66617,
    cnesCode: "2744872",
    locationNote:
      "Rua e número coincidem; o CNES informa Centro e o diretório municipal informa Vila Operária. Ponto cadastral, com bairro e funcionamento atual pendentes de reconfirmação.",
  },
];

export type Coordinates = { latitude: number; longitude: number };

/** Haversine distance in kilometres; calculated on the visitor's device. */
export function distanceKm(from: Coordinates, to: Coordinates): number {
  const radiusKm = 6371.0088;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const dLatitude = toRadians(to.latitude - from.latitude);
  const dLongitude = toRadians(to.longitude - from.longitude);
  const latitude1 = toRadians(from.latitude);
  const latitude2 = toRadians(to.latitude);
  const haversine =
    Math.sin(dLatitude / 2) ** 2 +
    Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(dLongitude / 2) ** 2;
  return 2 * radiusKm * Math.asin(Math.sqrt(Math.min(1, haversine)));
}
