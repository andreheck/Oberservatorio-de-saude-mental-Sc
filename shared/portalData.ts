import type { PortalRecord } from "./portal";
export function filterFinancialRecords(
  records: PortalRecord[],
  year: string,
  sphere = ""
) {
  return records.filter(
    r =>
      Number.isInteger(Number(r.data.year)) &&
      String(r.data.year) === year &&
      (!sphere || r.data.sphere === sphere)
  );
}
export function sumFinancialStage(
  records: PortalRecord[],
  stage: string
): number | null {
  const rows = records.filter(r => r.data.stage === stage);
  if (!rows.length) return null;
  const identifiers = new Set<string>();
  let cents = 0;
  for (const r of rows) {
    const identifier = String(r.data.financialIdentifier || "").trim();
    const amount = r.data.amount;
    if (
      !identifier ||
      identifiers.has(identifier) ||
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount < 0
    )
      return null;
    identifiers.add(identifier);
    cents += Math.round(amount * 100);
  }
  return cents / 100;
}
export function buildPortalCSV(records: PortalRecord[]) {
  const cols = [
    "id",
    "module",
    "title",
    "description",
    "status",
    "sourceName",
    "sourceUrl",
    "referencePeriod",
    "verifiedAt",
    "amount",
    "stage",
    "year",
    "sphere",
    "financialIdentifier",
  ];
  const cell = (v: unknown) => {
    const s = v instanceof Date ? v.toISOString() : String(v ?? "");
    return '"' + (/^[=+\-@]/.test(s) ? "'" + s : s).replaceAll('"', '""') + '"';
  };
  return (
    "\uFEFF" +
    cols.join(";") +
    "\n" +
    records
      .map(r =>
        cols.map(c => cell(c in r ? (r as any)[c] : r.data[c])).join(";")
      )
      .join("\n")
  );
}
