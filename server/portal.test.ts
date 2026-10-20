import { describe, expect, it } from "vitest";
import type { PortalRecord, PortalRole } from "../drizzle/schema";
import {
  calcRequestTime,
  canAddEventToRecord,
  canDownloadDocument,
  canReadDocuments,
  filterPublicRecords,
  validateDocumentSignature,
  validateRecordEditableForSave,
  validatePublishedRecordData,
  validateTransitionPermissions,
  validateTransitionRequirements,
} from "./portal";

function record(overrides: Partial<PortalRecord> = {}): PortalRecord {
  const now = new Date("2025-01-02T12:00:00.000Z");
  return {
    id: 1,
    module: "inspections",
    title: "Inspeção publicada",
    description: "Relatório público verificado",
    status: "realizada",
    publication: "published",
    sourceName: "Fonte oficial",
    sourceUrl: "https://example.test/source",
    referencePeriod: "2024",
    verifiedAt: now,
    data: { public: true },
    createdBy: 10,
    updatedBy: 10,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

const roles = (...values: PortalRole[]) => new Set<PortalRole>(values);

describe("portal public filters and publication security", () => {
  it("returns only published records and the exact public contract", () => {
    const rows = [
      record(),
      record({
        id: 2,
        publication: "draft",
        title: "Rascunho secreto",
        data: { internal: "do not leak" },
      }),
      record({
        id: 3,
        module: "budget",
        title: "Orçamento publicado",
        status: "pago",
      }),
    ];
    const result = filterPublicRecords(rows, {
      module: "inspections",
      search: "relatório",
    });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: 1,
      module: "inspections",
      publication: "published",
    });
    expect(Object.keys(result[0]!).sort()).toEqual([
      "createdAt",
      "data",
      "description",
      "id",
      "module",
      "publication",
      "referencePeriod",
      "sourceName",
      "sourceUrl",
      "status",
      "title",
      "updatedAt",
      "verifiedAt",
    ]);
    expect(result[0]).not.toHaveProperty("createdBy");
    expect(result[0]).not.toHaveProperty("internal");
  });

  it("enforces the editor/reviewer/admin publication separation", () => {
    expect(() =>
      validateTransitionPermissions(
        "draft",
        "review",
        roles("editor"),
        "inspections"
      )
    ).not.toThrow();
    expect(() =>
      validateTransitionPermissions(
        "review",
        "approved",
        roles("editor"),
        "inspections"
      )
    ).toThrow(/reviewer|admin/i);
    expect(() =>
      validateTransitionPermissions(
        "approved",
        "published",
        roles("editor"),
        "inspections"
      )
    ).toThrow(/reviewer|admin/i);
    expect(() =>
      validateTransitionPermissions(
        "review",
        "approved",
        roles("reviewer"),
        "inspections"
      )
    ).not.toThrow();
    expect(() =>
      validateTransitionPermissions(
        "approved",
        "published",
        roles("admin"),
        "inspections"
      )
    ).not.toThrow();
    expect(() =>
      validateTransitionPermissions(
        "published",
        "draft",
        roles("editor"),
        "inspections"
      )
    ).toThrow(/unpublish/i);
    expect(() =>
      validateTransitionPermissions(
        "published",
        "draft",
        roles("reviewer"),
        "inspections"
      )
    ).not.toThrow();
  });

  it("requires source, reference period, and verifiedAt before approval", () => {
    expect(() =>
      validateTransitionRequirements(
        record({ sourceName: "", referencePeriod: "2024" }),
        "approved"
      )
    ).toThrow(/source/i);
    expect(() =>
      validateTransitionRequirements(
        record({ referencePeriod: "" }),
        "approved"
      )
    ).toThrow(/reference/i);
    expect(() =>
      validateTransitionRequirements(record({ verifiedAt: null }), "published")
    ).toThrow(/verifiedAt/i);
    expect(() =>
      validateTransitionRequirements(
        record({ sourceUrl: "ftp://example.test/source" }),
        "approved"
      )
    ).toThrow(/sourceUrl|HTTP/i);
    expect(() =>
      validateTransitionRequirements(record(), "approved")
    ).not.toThrow();
  });

  it("requires verified address markers for public services and evidence for completed actions", () => {
    expect(() =>
      validatePublishedRecordData(record({ module: "services", data: {} }))
    ).toThrow(/address/i);
    expect(() =>
      validatePublishedRecordData(
        record({ module: "services", data: { address: "Rua 1" } })
      )
    ).toThrow(/verification/i);
    expect(() =>
      validatePublishedRecordData(
        record({
          module: "services",
          data: { address: "Rua 1", addressVerified: true },
        })
      )
    ).not.toThrow();
    expect(() =>
      validatePublishedRecordData(
        record({ module: "actions", status: "Concluída", data: {} })
      )
    ).toThrow(/evidenceUrl/i);
    expect(() =>
      validatePublishedRecordData(
        record({
          module: "actions",
          status: "Concluída",
          data: { evidenceUrl: "https://example.test/evidence" },
        })
      )
    ).not.toThrow();
  });
});

describe("portal request calculations", () => {
  it("uses UTC civil days and never calls an unverified request legally late", () => {
    const withoutVerification = calcRequestTime({
      sentAt: "2025-01-01T23:59:00Z",
      deadlineAt: "2025-01-02T00:00:00Z",
      now: "2025-01-03T00:01:00Z",
    });
    expect(withoutVerification.elapsedDays).toBe(2);
    expect(withoutVerification.daysRemaining).toBeNull();
    expect(withoutVerification.legallyOverdue).toBe(false);
    expect(withoutVerification.legalDelayStatus).toBe("not-verifiable");

    const withResponse = calcRequestTime({
      sentAt: "2025-01-01T23:59:00Z",
      deadlineAt: "2025-01-02T00:00:00Z",
      deadlineBasis: "prazo formal documentado",
      deadlineVerified: true,
      responseAt: "2025-01-03T00:01:00Z",
      now: "2025-01-03T00:01:00Z",
    });
    expect(withResponse.elapsedDays).toBe(2);
    expect(withResponse.overdueDays).toBe(1);
    expect(withResponse.legallyOverdue).toBe(true);
    expect(withResponse.legalDelayStatus).toBe("late");
  });

  it("does not infer legal delay when there is no recorded response", () => {
    const result = calcRequestTime({
      sentAt: "2025-02-01T00:00:00Z",
      deadlineAt: "2025-02-02T00:00:00Z",
      deadlineBasis: "prazo verificado",
      deadlineVerified: true,
      now: "2025-02-10T00:00:00Z",
    });
    expect(result.daysRemaining).toBe(-8);
    expect(result.overdueDays).toBeNull();
    expect(result.legallyOverdue).toBe(false);
    expect(result.legalDelayStatus).toBe("not-verifiable");
  });
});

describe("portal publication and document permissions", () => {
  it("requires explicit unpublication before editing or adding an event", () => {
    expect(() => validateRecordEditableForSave("published")).toThrow(
      /published|despublique/i
    );
    expect(() => validateRecordEditableForSave("draft")).not.toThrow();
    expect(canAddEventToRecord("published")).toBe(false);
    expect(canAddEventToRecord("draft")).toBe(true);
  });

  it("allows only the documented internal roles for private documents", () => {
    for (const role of [
      "admin",
      "editor",
      "documents",
      "reviewer",
      "reader",
    ] as const) {
      const roleSet = roles(role);
      expect(canReadDocuments(roleSet)).toBe(true);
      expect(canDownloadDocument("draft", roleSet)).toBe(true);
    }
    expect(canReadDocuments(roles())).toBe(false);
    expect(canDownloadDocument("draft", roles())).toBe(false);
    expect(canDownloadDocument("published", roles())).toBe(true);
    expect(canDownloadDocument("draft", roles("finance"))).toBe(false);
  });
});

describe("private document validation", () => {
  it("checks signatures for supported MIME types", () => {
    expect(() =>
      validateDocumentSignature("application/pdf", Buffer.from("%PDF-1.7"))
    ).not.toThrow();
    expect(() =>
      validateDocumentSignature(
        "image/png",
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
      )
    ).not.toThrow();
    expect(() =>
      validateDocumentSignature("image/jpeg", Buffer.from([255, 216, 255, 224]))
    ).not.toThrow();
    expect(() =>
      validateDocumentSignature("text/plain", Buffer.from("texto UTF-8\n"))
    ).not.toThrow();
    expect(() =>
      validateDocumentSignature("image/png", Buffer.from("not png"))
    ).toThrow();
    expect(() =>
      validateDocumentSignature("application/pdf", Buffer.from("not pdf"))
    ).toThrow();
  });
});
