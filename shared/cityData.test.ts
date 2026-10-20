import { describe, expect, it } from "vitest";
import {
  buildPopulationAgeCsv,
  cityIndicators,
  populationByAge,
  populationTotal,
} from "./cityData";

describe("perfil demográfico municipal", () => {
  it("soma as faixas etárias do SIDRA ao total do Censo 2022", () => {
    expect(populationByAge.reduce((sum, group) => sum + group.count, 0)).toBe(
      populationTotal
    );
  });

  it("mantém a estimativa de 2026 separada da contagem censitária", () => {
    const census = cityIndicators.find(
      indicator => indicator.label === "População residente"
    );
    const estimate = cityIndicators.find(
      indicator => indicator.label === "População estimada"
    );

    expect(census?.period).toBe("Censo Demográfico 2022");
    expect(estimate?.value).toBe("302.247");
    expect(estimate?.period).toContain("Estimativa 2026");
    expect(estimate?.sourceUrl).toContain("/t/6579/n6/4208203/p/2026");
  });

  it("exporta município, ano, faixa etária e unidade em CSV", () => {
    const csv = buildPopulationAgeCsv();
    expect(csv.split("\r\n")).toHaveLength(populationByAge.length + 1);
    expect(csv).toContain(
      '"municipio_codigo_ibge";"municipio";"ano";"faixa_etaria";"pessoas"'
    );
    expect(csv).toContain('"4208203";"Itajaí";"2022";"0 a 4 anos";"17771"');
    expect(csv).toContain('"4208203";"Itajaí";"2022";"100 anos ou mais";"19"');
  });
});
