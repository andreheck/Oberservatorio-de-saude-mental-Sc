import { describe, expect, it } from "vitest";
import {
  allMonitoringPriorities,
  allHealthPlanGoals,
  healthPlanGoalGroups,
  healthPlanSource,
} from "./healthPlanGoals";

describe("metas selecionadas da PAS de Itajaí", () => {
  it("mantém 18 códigos PAS em quatro frentes, sem duplicação", () => {
    expect(healthPlanGoalGroups.map(group => group.goals.length)).toEqual([
      8, 3, 7, 0,
    ]);
    expect(allHealthPlanGoals).toHaveLength(18);
    expect(new Set(allHealthPlanGoals.map(goal => goal.code)).size).toBe(18);
  });

  it("separa prioridades informadas pelo usuário das metas PAS", () => {
    expect(healthPlanGoalGroups.map(group => group.id)).toEqual([
      "expansao",
      "acesso",
      "qualidade",
      "informacao",
    ]);
    expect(allMonitoringPriorities).toHaveLength(9);
    const protocol = allMonitoringPriorities.find(item => item.code === "4.1.44");
    expect(protocol?.userReportedTarget).toContain("1 protocolo");
    expect(protocol?.sourceNote).toContain("não conferidos diretamente");
    expect(allMonitoringPriorities.every(item => item.sourceNote.length > 0)).toBe(
      true
    );
    expect(allHealthPlanGoals).toHaveLength(18);
  });

  it("preserva o recorte por objetivo e a proveniência indicada", () => {
    expect(
      allHealthPlanGoals.filter(goal => goal.objective === "1.3")
    ).toHaveLength(16);
    expect(
      allHealthPlanGoals.filter(goal => goal.objective === "2.1")
    ).toHaveLength(2);
    expect(healthPlanSource.sourcePdfVerifiedDirectly).toBe(false);
    expect(healthPlanSource.sourcePdfPages).toBe(49);
  });

  it("registra unidade, valores previstos, ação e página em cada ficha", () => {
    for (const goal of allHealthPlanGoals) {
      expect(goal.unitLabel.length).toBeGreaterThan(0);
      expect(goal.baseline2025.length).toBeGreaterThan(0);
      expect(goal.target2026.length).toBeGreaterThan(0);
      expect(goal.plan2026to2029.length).toBeGreaterThan(0);
      expect(goal.indicator.length).toBeGreaterThan(0);
      expect(goal.actions.length).toBeGreaterThan(0);
      expect(goal.sourcePages).toContain("PDF");
    }
  });

  it("não inventa órgão responsável nem execução observada", () => {
    expect(allHealthPlanGoals.every(goal => goal.responsible === null)).toBe(
      true
    );
    expect(allHealthPlanGoals.every(goal => goal.realized === null)).toBe(true);
    expect(healthPlanSource.executionDataAvailable).toBe(false);
  });
});
