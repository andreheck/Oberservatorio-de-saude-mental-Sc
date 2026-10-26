import { describe, expect, it } from "vitest";
import { distanceKm, verifiedHealthFacilities } from "./localHealthFacilities";

describe("localização pública de unidades de saúde", () => {
  it("inclui apenas os 17 cruzamentos UBS e o CAPS II com ressalva", () => {
    const ubs = verifiedHealthFacilities.filter(item => item.kind === "UBS");
    const caps = verifiedHealthFacilities.filter(item => item.kind === "CAPS");
    expect(ubs).toHaveLength(17);
    expect(caps).toHaveLength(1);
    expect(caps[0]?.locationNote).toContain("bairro");
  });

  it("mantém coordenadas finitas em faixa de controle de Itajaí e CNES distintos", () => {
    const codes = verifiedHealthFacilities.map(item => item.cnesCode);
    expect(new Set(codes).size).toBe(codes.length);
    for (const item of verifiedHealthFacilities) {
      expect(Number.isFinite(item.latitude)).toBe(true);
      expect(Number.isFinite(item.longitude)).toBe(true);
      expect(item.latitude).toBeGreaterThan(-27.1);
      expect(item.latitude).toBeLessThan(-26.8);
      expect(item.longitude).toBeGreaterThan(-48.9);
      expect(item.longitude).toBeLessThan(-48.55);
    }
  });

  it("calcula distância geodésica aproximada sem depender de APIs externas", () => {
    expect(
      distanceKm({ latitude: 0, longitude: 0 }, { latitude: 0, longitude: 1 })
    ).toBeCloseTo(111.195, 2);
    expect(
      distanceKm(
        { latitude: -26.9, longitude: -48.7 },
        { latitude: -26.9, longitude: -48.7 }
      )
    ).toBe(0);
  });
});
