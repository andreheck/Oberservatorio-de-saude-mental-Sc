import { describe, expect, it } from "vitest";
import {
  buildPortalCSV,
  filterFinancialRecords,
  sumFinancialStage,
} from "./portalData";
import { saveInput } from "../server/portal";
import type { PortalRecord } from "./portal";
const record = (
  data: Record<string, unknown>,
  title = "Registro de teste isolado"
): PortalRecord => ({
  id: 1,
  module: "budget",
  title,
  description: "Descrição objetiva",
  status: "Verificado",
  publication: "published",
  sourceName: "Fonte de teste",
  sourceUrl: "https://example.test",
  referencePeriod: "2026",
  verifiedAt: null,
  createdAt: "2026-01-01",
  updatedAt: "2026-01-01",
  data,
});
describe("dados financeiros e exportações", () => {
  it("exclui lançamentos sem ano e de outros exercícios", () => {
    const records = [
      record({ year: 2026 }),
      record({}),
      record({ year: 2025 }),
    ];
    expect(filterFinancialRecords(records, "2026")).toHaveLength(1);
  });
  it("não soma etapas diferentes nem duplicações e exige identificador", () => {
    const records = [
      record({
        year: 2026,
        stage: "paid",
        amount: 10.1,
        financialIdentifier: "a",
      }),
      record({
        year: 2026,
        stage: "paid",
        amount: 20.2,
        financialIdentifier: "b",
      }),
      record({
        year: 2026,
        stage: "committed",
        amount: 100,
        financialIdentifier: "c",
      }),
    ];
    expect(sumFinancialStage(records, "paid")).toBe(30.3);
    expect(sumFinancialStage([...records, records[0]], "paid")).toBeNull();
    expect(
      sumFinancialStage([record({ stage: "paid", amount: 10 })], "paid")
    ).toBeNull();
  });
  it("exporta valores e etapas e neutraliza fórmulas em CSV", () => {
    const csv = buildPortalCSV([
      record(
        {
          amount: 10,
          stage: "paid",
          year: 2026,
          sphere: "Municipal",
          financialIdentifier: "a",
        },
        "=formula"
      ),
    ]);
    expect(csv).toContain("amount;stage;year;sphere;financialIdentifier");
    expect(csv).toContain('"10";"paid";"2026";"Municipal";"a"');
    expect(csv).toContain('"\'=formula"');
  });
  it("não aceita descrição vazia em importação ou API", () => {
    expect(
      saveInput.safeParse({
        module: "budget",
        title: "título",
        description: "  ",
        status: "Em elaboração",
        sourceName: "",
        sourceUrl: "",
        referencePeriod: "",
        data: {},
      }).success
    ).toBe(false);
  });
});
