import { TRPCError } from "@trpc/server";
import { and, desc, eq, like, or } from "drizzle-orm";
import { z } from "zod";
import {
  PORTAL_DOCUMENT_ACCESS_SCOPES,
  PORTAL_PUBLICATIONS,
  PORTAL_ROLES,
  type PortalDocumentAccessScope,
  type PortalPublication,
  type PortalRecord,
  type PortalDocument,
  type PortalRole,
  portalAudit,
  portalDocuments,
  portalEvents,
  portalRecords,
  portalSettings,
  userPermissions,
  users,
} from "../drizzle/schema";
import { getDb } from "./db";
import type { TrpcContext } from "./_core/context";
import { ENV } from "./_core/env";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

export const DEFAULT_PORTAL_SETTINGS = {
  name: "Observatório de Saúde Mental (Sul do Brasil)",
  subtitle:
    "Transparência, participação social e monitoramento das políticas públicas de saúde mental.",
  signature:
    "Iniciativa de acompanhamento relacionada à atuação da CISM no COMUSA. Os dados disponíveis nesta etapa têm recorte municipal de Itajaí/SC.",
  contactEmail: "",
} as const;

const publicationValues = [...PORTAL_PUBLICATIONS] as [
  PortalPublication,
  ...PortalPublication[],
];
const accessScopeValues = [...PORTAL_DOCUMENT_ACCESS_SCOPES] as [
  PortalDocumentAccessScope,
  ...PortalDocumentAccessScope[],
];
const roleValues = [...PORTAL_ROLES] as [PortalRole, ...PortalRole[]];

const portalListInput = z
  .object({
    module: z.string().trim().max(80).optional(),
    search: z.string().trim().max(200).optional(),
    status: z.string().trim().max(120).optional(),
  })
  .optional();
export type PortalListInput = z.infer<typeof portalListInput>;

export const saveInput = z.object({
  id: z.number().int().positive().optional(),
  module: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(1000),
  description: z
    .string()
    .trim()
    .min(1, "A descrição objetiva é obrigatória")
    .max(10000),
  status: z.string().trim().min(1).max(120),
  sourceName: z.string().max(255),
  sourceUrl: z.string().max(2048),
  referencePeriod: z.string().max(120),
  verifiedAt: z.string().optional(),
  data: z.record(z.string(), z.unknown()),
});

const transitionInput = z.object({
  id: z.number().int().positive(),
  publication: z.enum(publicationValues),
  reason: z.string().trim().max(2000).optional(),
});

const settingsInput = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  subtitle: z.string().trim().min(1).max(10000).optional(),
  signature: z.string().trim().min(1).max(10000).optional(),
  contactEmail: z
    .string()
    .trim()
    .refine(value => value === "" || z.email().safeParse(value).success, {
      message: "contactEmail deve ficar vazio ou ser um e-mail válido",
    })
    .max(320)
    .optional(),
});

const eventInput = z.object({
  id: z.number().int().positive(),
  description: z.string().trim().min(1).max(10000),
  occurredAt: z.string(),
  documentId: z.number().int().positive().optional(),
});

const documentUploadInput = z.object({
  title: z.string().trim().min(1).max(255),
  mime: z.enum(["application/pdf", "image/png", "image/jpeg", "text/plain"]),
  base64: z.string().min(1).max(7_500_000),
  accessScope: z.enum(accessScopeValues).default("public"),
});

const documentTransitionInput = z.object({
  id: z.number().int().positive(),
  publication: z.enum(publicationValues),
  reason: z.string().trim().max(2000).optional(),
});

const adminListInput = z
  .object({ module: z.string().trim().max(80).optional() })
  .optional();
const auditInput = z
  .object({
    recordId: z.number().int().positive().optional(),
    limit: z.number().int().min(1).max(200).default(100),
  })
  .optional();
const setRoleInput = z.object({
  userId: z.number().int().positive(),
  role: z.enum(roleValues),
});

export type PortalPublicRecord = {
  id: number;
  module: string;
  title: string;
  description: string;
  status: string;
  publication: "published";
  sourceName: string;
  sourceUrl: string;
  referencePeriod: string;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  data: Record<string, unknown>;
};

export type PortalDocumentMetadata = {
  id: number;
  title: string;
  mime: string;
  sizeBytes: number;
  publication: PortalPublication;
  accessScope: PortalDocumentAccessScope;
  createdAt: Date;
};

export type RequestTimeInput = {
  sentAt?: Date | string | null;
  responseAt?: Date | string | null;
  deadlineAt?: Date | string | null;
  deadlineBasis?: string | null;
  deadlineVerified?: boolean | null;
  now?: Date | string;
};

export type RequestTimeResult = {
  elapsedDays: number | null;
  daysRemaining: number | null;
  overdueDays: number | null;
  legallyOverdue: boolean;
  legalDelayStatus: "not-verifiable" | "on-time" | "late";
};

const MS_PER_CIVIL_DAY = 24 * 60 * 60 * 1000;

function asDate(value: Date | string | null | undefined): Date | null {
  if (value == null) return null;
  const date =
    value instanceof Date ? new Date(value.getTime()) : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function utcDay(value: Date): number {
  return Date.UTC(
    value.getUTCFullYear(),
    value.getUTCMonth(),
    value.getUTCDate()
  );
}

function civilDayDifference(from: Date, to: Date): number {
  return Math.floor((utcDay(to) - utcDay(from)) / MS_PER_CIVIL_DAY);
}

/**
 * Calculates elapsed civil UTC days. A legal delay is deliberately reported as
 * unverifiable unless a verified deadline and a recorded response date exist.
 * This avoids claiming that an institution was legally late from missing data.
 */
export function calcRequestTime(input: RequestTimeInput): RequestTimeResult {
  const sentAt = asDate(input.sentAt);
  const responseAt = asDate(input.responseAt);
  const deadlineAt = asDate(input.deadlineAt);
  const now = asDate(input.now) ?? new Date();
  const end = responseAt ?? now;
  const elapsedDays = sentAt
    ? Math.max(0, civilDayDifference(sentAt, end))
    : null;
  const hasVerifiedDeadline = Boolean(
    sentAt &&
      deadlineAt &&
      input.deadlineVerified === true &&
      nonEmptyString(input.deadlineBasis)
  );
  const daysRemaining =
    hasVerifiedDeadline && !responseAt
      ? civilDayDifference(now, deadlineAt!)
      : null;
  const canAssessLegalDelay = Boolean(
    input.deadlineVerified &&
      input.deadlineBasis?.trim() &&
      deadlineAt &&
      responseAt
  );
  const overdueDays =
    canAssessLegalDelay && responseAt && deadlineAt
      ? Math.max(0, civilDayDifference(deadlineAt, responseAt))
      : null;
  const legallyOverdue = Boolean(
    canAssessLegalDelay && overdueDays !== null && overdueDays > 0
  );
  return {
    elapsedDays,
    daysRemaining,
    overdueDays,
    legallyOverdue,
    legalDelayStatus: !canAssessLegalDelay
      ? "not-verifiable"
      : legallyOverdue
        ? "late"
        : "on-time",
  };
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function publicRecord(record: PortalRecord): PortalPublicRecord | null {
  if (record.publication !== "published") return null;
  return {
    id: record.id,
    module: record.module,
    title: record.title,
    description: record.description,
    status: record.status,
    publication: "published",
    sourceName: record.sourceName,
    sourceUrl: record.sourceUrl,
    referencePeriod: record.referencePeriod,
    verifiedAt: record.verifiedAt,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    data: asRecord(record.data),
  };
}

export function isPublicRecord(
  record: Pick<PortalRecord, "publication">
): boolean {
  return record.publication === "published";
}

/** Pure filtering helper used by the public query and backend tests. */
export function filterPublicRecords(
  records: PortalRecord[],
  input?: PortalListInput
): PortalPublicRecord[] {
  return records
    .filter(record => isPublicRecord(record))
    .filter(record => !input?.module || record.module === input.module)
    .filter(record => !input?.status || record.status === input.status)
    .filter(record => {
      if (!input?.search) return true;
      const search = input.search.toLocaleLowerCase();
      return `${record.title}\n${record.description}`
        .toLocaleLowerCase()
        .includes(search);
    })
    .map(publicRecord)
    .filter((record): record is PortalPublicRecord => record !== null);
}

function normalized(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

function moduleKey(module: string): string {
  return normalized(module)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const financeModules = new Set([
  "budget",
  "orcamento",
  "communities",
  "community",
  "comunidades-terapeuticas",
]);
const inspectionModules = new Set([
  "inspections",
  "inspection",
  "inspecoes",
  "requests",
  "request",
  "solicitacoes",
]);
const requestModules = new Set([
  "requests",
  "request",
  "solicitacoes",
  "solicitacao",
]);
const documentModules = new Set(["documents", "document", "documentos"]);
const serviceModules = new Set([
  "services",
  "service",
  "raps",
  "map",
  "caps",
  "equipment",
  "equipments",
  "health-services",
]);
const actionModules = new Set([
  "actions",
  "action",
  "executive-actions",
  "acoes",
]);

function hasAnyRole(
  roles: ReadonlySet<PortalRole>,
  candidates: PortalRole[]
): boolean {
  return candidates.some(role => roles.has(role));
}

export function canReadModule(
  roles: ReadonlySet<PortalRole>,
  module?: string
): boolean {
  if (hasAnyRole(roles, ["admin", "reviewer", "reader", "editor"])) return true;
  if (!module) return false;
  const key = moduleKey(module);
  return (
    (roles.has("finance") && financeModules.has(key)) ||
    (roles.has("inspections") && inspectionModules.has(key)) ||
    (roles.has("documents") && documentModules.has(key))
  );
}

export function canEditModule(
  roles: ReadonlySet<PortalRole>,
  module: string
): boolean {
  if (hasAnyRole(roles, ["admin", "editor"])) return true;
  const key = moduleKey(module);
  return (
    (roles.has("finance") && financeModules.has(key)) ||
    (roles.has("inspections") && inspectionModules.has(key)) ||
    (roles.has("documents") && documentModules.has(key))
  );
}

/** Roles that may inspect existing internal document metadata or files. */
export function canReadDocuments(roles: ReadonlySet<PortalRole>): boolean {
  return hasAnyRole(roles, [
    "admin",
    "editor",
    "documents",
    "reviewer",
    "reader",
  ]);
}

/** Only admins and CISM members may use the CISM-only published listing. */
export function canReadCismDocuments(roles: ReadonlySet<PortalRole>): boolean {
  return hasAnyRole(roles, ["admin", "cism_member"]);
}

/**
 * CISM members may download only published CISM material. Existing document
 * administrators (admin/documents/reviewer) retain their internal workflow
 * access, including non-published material, without granting it to members.
 */
export function canDownloadCismDocument(
  publication: PortalPublication,
  roles: ReadonlySet<PortalRole>
): boolean {
  if (hasAnyRole(roles, ["admin", "documents", "reviewer"])) return true;
  return publication === "published" && roles.has("cism_member");
}

/** Published public documents are anonymous; internal material keeps its existing policy. */
export function canDownloadDocument(
  publication: PortalPublication,
  roles: ReadonlySet<PortalRole>,
  accessScope?: PortalDocumentAccessScope
): boolean;
export function canDownloadDocument(
  publication: PortalPublication,
  accessScope: PortalDocumentAccessScope,
  roles?: ReadonlySet<PortalRole>
): boolean;
export function canDownloadDocument(
  publication: PortalPublication,
  rolesOrScope: ReadonlySet<PortalRole> | PortalDocumentAccessScope,
  scopeOrRoles: PortalDocumentAccessScope | ReadonlySet<PortalRole> = "public"
): boolean {
  const isScopeFirst = typeof rolesOrScope === "string";
  const accessScope = isScopeFirst
    ? rolesOrScope
    : typeof scopeOrRoles === "string"
      ? scopeOrRoles
      : "public";
  const roles = isScopeFirst
    ? typeof scopeOrRoles === "object" && scopeOrRoles !== null
      ? scopeOrRoles
      : new Set<PortalRole>()
    : rolesOrScope;
  if (accessScope === "cism")
    return canDownloadCismDocument(publication, roles);
  return publication === "published" || canReadDocuments(roles);
}

export function validateRecordEditableForSave(
  publication: PortalPublication
): void {
  if (publication === "published") {
    throw new Error(
      "O registro publicado não pode ser editado. Despublique explicitamente (published -> draft) com justificativa antes de editar"
    );
  }
}

export function canAddEventToRecord(publication: PortalPublication): boolean {
  return publication !== "published";
}

function canSubmitForReview(
  roles: ReadonlySet<PortalRole>,
  module: string
): boolean {
  return canEditModule(roles, module);
}

function canReview(roles: ReadonlySet<PortalRole>): boolean {
  return hasAnyRole(roles, ["admin", "reviewer"]);
}

/** Checks the ordered draft -> review -> approved -> published workflow. */
export function validateTransitionPermissions(
  current: PortalPublication,
  target: PortalPublication,
  roles: ReadonlySet<PortalRole>,
  module = ""
): void {
  if (current === target)
    throw new Error("O registro já está nesse estado de publicação");
  if (current === "published" && target === "draft") {
    if (!canReview(roles))
      throw new Error(
        "Somente admin ou revisor (reviewer) pode despublicar (unpublish) um registro"
      );
    return;
  }
  if (current === "draft" && target === "review") {
    if (!canSubmitForReview(roles, module))
      throw new Error("Este papel não pode enviar este módulo para revisão");
    return;
  }
  if (current === "review" && target === "approved") {
    if (!canReview(roles))
      throw new Error(
        "Somente admin ou revisor (reviewer) pode aprovar um registro"
      );
    return;
  }
  if (current === "approved" && target === "published") {
    if (!canReview(roles))
      throw new Error(
        "Somente admin ou revisor (reviewer) pode publicar um registro"
      );
    return;
  }
  throw new Error(`Transição de publicação inválida: ${current} -> ${target}`);
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Enforces source, URL, reference period and verification before approval/publication. */
export function validateTransitionRequirements(
  record: Pick<
    PortalRecord,
    "sourceName" | "sourceUrl" | "referencePeriod" | "verifiedAt"
  >,
  target: PortalPublication
): void {
  if (target !== "approved" && target !== "published") return;
  if (!nonEmptyString(record.sourceName))
    throw new Error("Uma fonte (sourceName) é obrigatória antes da aprovação");
  let sourceUrl: URL;
  try {
    sourceUrl = new URL(record.sourceUrl.trim());
  } catch {
    throw new Error("A sourceUrl deve ser uma URL HTTP(s) válida");
  }
  if (
    !nonEmptyString(record.sourceUrl) ||
    !["http:", "https:"].includes(sourceUrl.protocol) ||
    !sourceUrl.hostname
  ) {
    throw new Error("A sourceUrl deve ser uma URL HTTP(s) válida");
  }
  if (!nonEmptyString(record.referencePeriod))
    throw new Error(
      "O período de referência (referencePeriod) é obrigatório antes da aprovação"
    );
  if (!asDate(record.verifiedAt)) {
    throw new Error("verifiedAt é obrigatório antes da aprovação");
  }
}

/** Extra guards for records used as public map/service markers and completed actions. */
export function validatePublishedRecordData(
  record: Pick<PortalRecord, "module" | "status" | "data">
): void {
  const key = moduleKey(record.module);
  const data = asRecord(record.data);
  if (serviceModules.has(key)) {
    const address = data.address ?? data.endereco;
    const verified =
      data.addressVerified === true ||
      data.locationVerified === true ||
      data.verified === true;
    if (!nonEmptyString(address))
      throw new Error(
        "Serviços publicados exigem um endereço (address) verificado"
      );
    if (!verified)
      throw new Error(
        "Marcadores de serviços publicados exigem verificação (verification) do address"
      );
  }
  const statusKey = normalized(record.status);
  if (
    actionModules.has(key) &&
    (statusKey.includes("conclu") ||
      statusKey.includes("complete") ||
      statusKey.includes("finaliz"))
  ) {
    if (!nonEmptyString(data.evidenceUrl)) {
      throw new Error("Ações concluídas exigem evidenceUrl");
    }
  }
}

export const ALLOWED_DOCUMENT_MIME = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "text/plain",
] as const;

export function validateDocumentSignature(mime: string, bytes: Buffer): void {
  if (
    !ALLOWED_DOCUMENT_MIME.includes(
      mime as (typeof ALLOWED_DOCUMENT_MIME)[number]
    )
  ) {
    throw new Error("Tipo MIME de documento não suportado");
  }
  const isPdf =
    mime === "application/pdf" &&
    bytes.subarray(0, 5).toString("ascii") === "%PDF-";
  const isPng =
    mime === "image/png" &&
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const isJpeg =
    mime === "image/jpeg" &&
    bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255]));
  const isText =
    mime === "text/plain" &&
    !bytes.includes(0) &&
    !bytes.toString("utf8").includes("\uFFFD");
  if (!(isPdf || isPng || isJpeg || isText))
    throw new Error(
      "O conteúdo do documento não corresponde ao MIME informado"
    );
}

function parseDateOrThrow(
  value: string | undefined,
  field: string
): Date | undefined {
  if (value === undefined) return undefined;
  const parsed = asDate(value);
  if (!parsed)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `${field} deve ser uma data válida`,
    });
  return parsed;
}

function requireUser(ctx: TrpcContext) {
  if (!ctx.user)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Faça login para continuar (10001)",
    });
  return ctx.user;
}

async function requireDb() {
  const db = await getDb();
  if (!db)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "O banco de dados não está disponível",
    });
  return db;
}

type PortalDatabase = NonNullable<Awaited<ReturnType<typeof getDb>>>;

async function getRoles(
  db: PortalDatabase,
  ctx: TrpcContext
): Promise<Set<PortalRole>> {
  const user = requireUser(ctx);
  const roles = new Set<PortalRole>();
  // The starter's admin role is accepted. OWNER_OPEN_ID is promoted by db.upsertUser,
  // rather than granting admin to the first authenticated visitor.
  if (user.role === "admin") roles.add("admin");
  const rows = await db
    .select({ role: userPermissions.role })
    .from(userPermissions)
    .where(eq(userPermissions.userId, user.id));
  for (const row of rows) roles.add(row.role as PortalRole);
  return roles;
}

async function requireRoles(
  db: PortalDatabase,
  ctx: TrpcContext,
  check: (roles: ReadonlySet<PortalRole>) => boolean,
  message = "You do not have required permission (10002)"
): Promise<{ user: NonNullable<TrpcContext["user"]>; roles: Set<PortalRole> }> {
  const user = requireUser(ctx);
  const roles = await getRoles(db, ctx);
  if (!check(roles)) throw new TRPCError({ code: "FORBIDDEN", message });
  return { user, roles };
}

function recordAuditValue(
  record: PortalRecord | null
): Record<string, unknown> | null {
  if (!record) return null;
  return {
    id: record.id,
    module: record.module,
    title: record.title,
    description: record.description,
    status: record.status,
    publication: record.publication,
    sourceName: record.sourceName,
    sourceUrl: record.sourceUrl,
    referencePeriod: record.referencePeriod,
    verifiedAt: record.verifiedAt?.toISOString() ?? null,
    data: asRecord(record.data),
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

function settingsValue(row: typeof portalSettings.$inferSelect | null) {
  return {
    name: row?.name ?? DEFAULT_PORTAL_SETTINGS.name,
    subtitle: row?.subtitle ?? DEFAULT_PORTAL_SETTINGS.subtitle,
    signature: row?.signature ?? DEFAULT_PORTAL_SETTINGS.signature,
    contactEmail: row?.contactEmail ?? DEFAULT_PORTAL_SETTINGS.contactEmail,
  };
}

function requestTimeForRecord(
  record: Pick<PortalRecord, "module" | "data">
): RequestTimeResult | null {
  if (!requestModules.has(moduleKey(record.module))) return null;
  const data = asRecord(record.data);
  const dateValue = (value: unknown): Date | string | null =>
    value instanceof Date || typeof value === "string" ? value : null;
  return calcRequestTime({
    sentAt: dateValue(data.sentAt),
    responseAt: dateValue(data.responseAt),
    deadlineAt: dateValue(data.deadlineAt),
    deadlineBasis:
      typeof data.deadlineBasis === "string" ? data.deadlineBasis : null,
    deadlineVerified:
      typeof data.deadlineVerified === "boolean" ? data.deadlineVerified : null,
  });
}

function documentMetadata(
  document: Pick<
    PortalDocument,
    | "id"
    | "title"
    | "mime"
    | "sizeBytes"
    | "publication"
    | "accessScope"
    | "createdAt"
  >
): PortalDocumentMetadata {
  return {
    id: document.id,
    title: document.title,
    mime: document.mime,
    sizeBytes: document.sizeBytes,
    publication: document.publication,
    accessScope: document.accessScope,
    createdAt: document.createdAt,
  };
}

type PortalDocumentAccessRow = Pick<
  PortalDocument,
  | "id"
  | "title"
  | "mime"
  | "sizeBytes"
  | "publication"
  | "accessScope"
  | "createdAt"
>;

/** Public document metadata never includes CISM-scope rows or content. */
export function filterPublicDocuments(
  documents: readonly PortalDocumentAccessRow[]
): PortalDocumentMetadata[] {
  return documents
    .filter(
      document =>
        document.publication === "published" &&
        document.accessScope === "public"
    )
    .map(documentMetadata);
}

/** CISM listing metadata is restricted to explicitly scoped, published rows. */
export function filterCismDocuments(
  documents: readonly PortalDocumentAccessRow[]
): PortalDocumentMetadata[] {
  return documents
    .filter(
      document =>
        document.publication === "published" && document.accessScope === "cism"
    )
    .map(documentMetadata);
}

export const portalRouter = router({
  settings: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return DEFAULT_PORTAL_SETTINGS;
    const rows = await db
      .select()
      .from(portalSettings)
      .where(eq(portalSettings.id, 1))
      .limit(1);
    return settingsValue(rows[0] ?? null);
  }),

  myRoles: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    const { roles } = await requireRoles(db, ctx, () => true);
    return PORTAL_ROLES.filter(role => roles.has(role));
  }),

  updateSettings: protectedProcedure
    .input(settingsInput)
    .mutation(async ({ ctx, input }) => {
      const db = await requireDb();
      const { user } = await requireRoles(db, ctx, roles => roles.has("admin"));
      return db.transaction(async tx => {
        const rows = await tx
          .select()
          .from(portalSettings)
          .where(eq(portalSettings.id, 1))
          .limit(1);
        const previous = settingsValue(rows[0] ?? null);
        const next = { ...previous, ...input };
        await tx
          .insert(portalSettings)
          .values({ id: 1, ...next, updatedBy: user.id })
          .onDuplicateKeyUpdate({ set: { ...next, updatedBy: user.id } });
        await tx.insert(portalAudit).values({
          recordId: null,
          actorId: user.id,
          actorOpenId: user.openId,
          action: "settings.update",
          reason: null,
          oldValue: previous,
          newValue: next,
        });
        return next;
      });
    }),

  list: publicProcedure.input(portalListInput).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [] as PortalPublicRecord[];
    const conditions = [eq(portalRecords.publication, "published" as const)];
    if (input?.module) conditions.push(eq(portalRecords.module, input.module));
    if (input?.status) conditions.push(eq(portalRecords.status, input.status));
    if (input?.search) {
      const pattern = `%${input.search}%`;
      conditions.push(
        or(
          like(portalRecords.title, pattern),
          like(portalRecords.description, pattern)
        )!
      );
    }
    const rows = await db
      .select()
      .from(portalRecords)
      .where(and(...conditions))
      .orderBy(desc(portalRecords.updatedAt));
    return rows
      .map(publicRecord)
      .filter((record): record is PortalPublicRecord => record !== null);
  }),

  documentsList: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const rows = await db
      .select({
        id: portalDocuments.id,
        title: portalDocuments.title,
        mime: portalDocuments.mime,
        sizeBytes: portalDocuments.sizeBytes,
        publication: portalDocuments.publication,
        accessScope: portalDocuments.accessScope,
        createdAt: portalDocuments.createdAt,
      })
      .from(portalDocuments)
      .where(
        and(
          eq(portalDocuments.publication, "published" as const),
          eq(portalDocuments.accessScope, "public" as const)
        )
      )
      .orderBy(desc(portalDocuments.createdAt));
    return filterPublicDocuments(rows);
  }),

  documentsAdminList: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    await requireRoles(
      db,
      ctx,
      canReadDocuments,
      "Você não tem permissão para ler documentos"
    );
    const rows = await db
      .select({
        id: portalDocuments.id,
        title: portalDocuments.title,
        mime: portalDocuments.mime,
        sizeBytes: portalDocuments.sizeBytes,
        publication: portalDocuments.publication,
        accessScope: portalDocuments.accessScope,
        createdAt: portalDocuments.createdAt,
      })
      .from(portalDocuments)
      .orderBy(desc(portalDocuments.createdAt));
    return rows.map(documentMetadata);
  }),

  /** Protected, non-content status used by authenticated access controls. */
  documentsAccessStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    const { roles } = await requireRoles(db, ctx, () => true);
    return {
      accessScope: "cism" as const,
      isCismMember: roles.has("cism_member"),
      canReadCismDocuments: canReadCismDocuments(roles),
      canDownloadPublishedCism: canDownloadCismDocument("published", roles),
    };
  }),

  /** CISM-only listing: published metadata only, never document content/base64. */
  documentsCismList: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    await requireRoles(
      db,
      ctx,
      canReadCismDocuments,
      "Você não tem permissão para ler documentos da CISM"
    );
    const rows = await db
      .select({
        id: portalDocuments.id,
        title: portalDocuments.title,
        mime: portalDocuments.mime,
        sizeBytes: portalDocuments.sizeBytes,
        publication: portalDocuments.publication,
        accessScope: portalDocuments.accessScope,
        createdAt: portalDocuments.createdAt,
      })
      .from(portalDocuments)
      .where(
        and(
          eq(portalDocuments.publication, "published" as const),
          eq(portalDocuments.accessScope, "cism" as const)
        )
      )
      .orderBy(desc(portalDocuments.createdAt));
    return filterCismDocuments(rows);
  }),

  detail: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Published record not found",
        });
      const rows = await db
        .select()
        .from(portalRecords)
        .where(eq(portalRecords.id, input.id))
        .limit(1);
      const record = rows[0];
      const published = record ? publicRecord(record) : null;
      if (!published)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Published record not found",
        });
      const eventRows = await db
        .select({
          id: portalEvents.id,
          description: portalEvents.description,
          occurredAt: portalEvents.occurredAt,
          documentId: portalEvents.documentId,
          authorName: portalEvents.authorName,
          createdAt: portalEvents.createdAt,
        })
        .from(portalEvents)
        .where(eq(portalEvents.recordId, input.id))
        .orderBy(desc(portalEvents.occurredAt));
      const publishedDocuments = await db
        .select({ id: portalDocuments.id })
        .from(portalDocuments)
        .where(
          and(
            eq(portalDocuments.publication, "published" as const),
            eq(portalDocuments.accessScope, "public" as const)
          )
        );
      const publishedDocumentIds = new Set(
        publishedDocuments.map(document => document.id)
      );
      const events = eventRows.map(event => ({
        ...event,
        authorName: "Responsável institucional",
        documentId:
          event.documentId && publishedDocumentIds.has(event.documentId)
            ? event.documentId
            : null,
      }));
      return {
        record: published,
        events,
        requestTime: requestTimeForRecord(record),
      };
    }),

  adminList: protectedProcedure
    .input(adminListInput)
    .query(async ({ ctx, input }) => {
      const db = await requireDb();
      const { roles } = await requireRoles(db, ctx, current =>
        canReadModule(current, input?.module)
      );
      if (
        !input?.module &&
        !hasAnyRole(roles, ["admin", "editor", "reviewer", "reader"])
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This role must request a module explicitly",
        });
      }
      const conditions = [];
      if (input?.module) {
        if (!canReadModule(roles, input.module)) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "This role cannot read this module",
          });
        }
        conditions.push(eq(portalRecords.module, input.module));
      }
      return db
        .select()
        .from(portalRecords)
        .where(conditions.length ? and(...conditions) : undefined)
        .orderBy(desc(portalRecords.updatedAt));
    }),

  save: protectedProcedure.input(saveInput).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const user = requireUser(ctx);
    const roles = await getRoles(db, ctx);
    if (!canEditModule(roles, input.module)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "This role cannot edit this module",
      });
    }
    const parsedVerifiedAt = parseDateOrThrow(input.verifiedAt, "verifiedAt");
    let recordId = input.id;
    await db.transaction(async tx => {
      const existingRows = input.id
        ? await tx
            .select()
            .from(portalRecords)
            .where(eq(portalRecords.id, input.id))
            .limit(1)
        : [];
      const existing = existingRows[0] ?? null;
      if (input.id && !existing)
        throw new TRPCError({ code: "NOT_FOUND", message: "Record not found" });
      if (existing && !canEditModule(roles, existing.module)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Este papel não pode editar este módulo",
        });
      }
      if (existing) {
        try {
          validateRecordEditableForSave(existing.publication);
        } catch (error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              error instanceof Error
                ? error.message
                : "O registro publicado não pode ser editado",
          });
        }
      }
      const verifiedAt =
        input.verifiedAt === undefined
          ? (existing?.verifiedAt ?? null)
          : (parsedVerifiedAt ?? null);
      const values = {
        module: input.module,
        title: input.title,
        description: input.description,
        status: input.status,
        publication: "draft" as const,
        sourceName: input.sourceName,
        sourceUrl: input.sourceUrl,
        referencePeriod: input.referencePeriod,
        verifiedAt,
        data: input.data,
        updatedBy: user.id,
      };
      if (existing) {
        await tx
          .update(portalRecords)
          .set(values)
          .where(eq(portalRecords.id, existing.id));
        recordId = existing.id;
      } else {
        const inserted = await tx.insert(portalRecords).values({
          ...values,
          createdBy: user.id,
        });
        recordId = Number(inserted[0]?.insertId);
      }
      const afterRows = await tx
        .select()
        .from(portalRecords)
        .where(eq(portalRecords.id, recordId!))
        .limit(1);
      await tx.insert(portalAudit).values({
        recordId: recordId!,
        actorId: user.id,
        actorOpenId: user.openId,
        action: existing ? "record.update" : "record.create",
        reason: null,
        oldValue: recordAuditValue(existing),
        newValue: recordAuditValue(afterRows[0] ?? null),
      });
    });
    return { id: recordId!, publication: "draft" as const };
  }),

  transition: protectedProcedure
    .input(transitionInput)
    .mutation(async ({ ctx, input }) => {
      const db = await requireDb();
      const user = requireUser(ctx);
      const roles = await getRoles(db, ctx);
      let result: PortalPublication = input.publication;
      await db.transaction(async tx => {
        const rows = await tx
          .select()
          .from(portalRecords)
          .where(eq(portalRecords.id, input.id))
          .limit(1);
        const record = rows[0];
        if (!record)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Record not found",
          });
        try {
          validateTransitionPermissions(
            record.publication,
            input.publication,
            roles,
            record.module
          );
          validateTransitionRequirements(record, input.publication);
          if (input.publication === "published")
            validatePublishedRecordData(record);
          if (
            record.publication === "published" &&
            input.publication === "draft" &&
            !input.reason
          ) {
            throw new Error("Unpublishing requires a reason");
          }
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              error instanceof Error ? error.message : "Invalid transition",
          });
        }
        await tx
          .update(portalRecords)
          .set({ publication: input.publication, updatedBy: user.id })
          .where(eq(portalRecords.id, input.id));
        const afterRows = await tx
          .select()
          .from(portalRecords)
          .where(eq(portalRecords.id, input.id))
          .limit(1);
        await tx.insert(portalAudit).values({
          recordId: input.id,
          actorId: user.id,
          actorOpenId: user.openId,
          action: `record.transition.${input.publication}`,
          reason: input.reason ?? null,
          oldValue: recordAuditValue(record),
          newValue: recordAuditValue(afterRows[0] ?? null),
        });
        result = input.publication;
      });
      return { id: input.id, publication: result };
    }),

  addEvent: protectedProcedure
    .input(eventInput)
    .mutation(async ({ ctx, input }) => {
      const db = await requireDb();
      const user = requireUser(ctx);
      const roles = await getRoles(db, ctx);
      const occurredAt = parseDateOrThrow(input.occurredAt, "occurredAt");
      if (!occurredAt)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "occurredAt is required",
        });
      const recordRows = await db
        .select()
        .from(portalRecords)
        .where(eq(portalRecords.id, input.id))
        .limit(1);
      const record = recordRows[0];
      if (!record)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Registro não encontrado",
        });
      if (!canEditModule(roles, record.module) && !canReview(roles)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Este papel não pode adicionar eventos a este módulo",
        });
      }
      if (!canAddEventToRecord(record.publication)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Não é possível adicionar evento a registro publicado. Faça a despublicação explícita (published -> draft) e revise antes de publicar novamente",
        });
      }
      if (input.documentId) {
        const documentRows = await db
          .select({ id: portalDocuments.id })
          .from(portalDocuments)
          .where(eq(portalDocuments.id, input.documentId))
          .limit(1);
        if (!documentRows[0])
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Documento não encontrado",
          });
      }
      const authorName = "Responsável institucional";
      let eventId = 0;
      await db.transaction(async tx => {
        const inserted = await tx.insert(portalEvents).values({
          recordId: input.id,
          description: input.description,
          occurredAt,
          documentId: input.documentId,
          authorId: user.id,
          authorName,
        });
        eventId = Number(inserted[0]?.insertId);
        await tx.insert(portalAudit).values({
          recordId: input.id,
          actorId: user.id,
          actorOpenId: user.openId,
          action: "event.create",
          reason: null,
          oldValue: null,
          newValue: {
            id: eventId,
            recordId: input.id,
            description: input.description,
            occurredAt: occurredAt.toISOString(),
            documentId: input.documentId ?? null,
            authorName,
          },
        });
      });
      return {
        id: eventId,
        recordId: input.id,
        occurredAt,
        authorName,
      };
    }),

  audit: protectedProcedure.input(auditInput).query(async ({ ctx, input }) => {
    const db = await requireDb();
    await requireRoles(db, ctx, roles => roles.has("admin"));
    const conditions = input?.recordId
      ? [eq(portalAudit.recordId, input.recordId)]
      : [];
    return db
      .select()
      .from(portalAudit)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(portalAudit.createdAt))
      .limit(input?.limit ?? 100);
  }),

  users: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    await requireRoles(db, ctx, roles => roles.has("admin"));
    const allUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt));
    const permissions = await db.select().from(userPermissions);
    return allUsers.map(user => ({
      id: user.id,
      openId: user.openId,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: permissions
        .filter(permission => permission.userId === user.id)
        .map(permission => permission.role),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }),

  setRole: protectedProcedure
    .input(setRoleInput)
    .mutation(async ({ ctx, input }) => {
      const db = await requireDb();
      const actor = requireUser(ctx);
      await requireRoles(db, ctx, roles => roles.has("admin"));
      if (actor.id === input.userId && input.role !== "admin") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot remove your own admin role",
        });
      }
      const targetRows = await db
        .select({ id: users.id, openId: users.openId })
        .from(users)
        .where(eq(users.id, input.userId))
        .limit(1);
      if (!targetRows[0])
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      if (targetRows[0].openId === ENV.ownerOpenId && input.role !== "admin") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The configured owner must remain an admin",
        });
      }
      await db.transaction(async tx => {
        const previousPermissions = await tx
          .select({ role: userPermissions.role })
          .from(userPermissions)
          .where(eq(userPermissions.userId, input.userId));
        // setRole is intentionally singular: a later assignment replaces the old
        // portal permission, while the built-in users.role remains the auth source.
        await tx
          .delete(userPermissions)
          .where(eq(userPermissions.userId, input.userId));
        await tx
          .insert(userPermissions)
          .values({ userId: input.userId, role: input.role })
          .onDuplicateKeyUpdate({ set: { updatedAt: new Date() } });
        await tx
          .update(users)
          .set({ role: input.role === "admin" ? "admin" : "user" })
          .where(eq(users.id, input.userId));
        await tx.insert(portalAudit).values({
          recordId: null,
          actorId: actor.id,
          actorOpenId: actor.openId,
          action: "user.role.set",
          reason: null,
          oldValue: {
            userId: input.userId,
            permissions: previousPermissions.map(permission => permission.role),
          },
          newValue: { userId: input.userId, role: input.role },
        });
      });
      return { userId: input.userId, role: input.role };
    }),

  documentsUpload: protectedProcedure
    .input(documentUploadInput)
    .mutation(async ({ ctx, input }) => {
      const db = await requireDb();
      const { user } = await requireRoles(db, ctx, roles =>
        hasAnyRole(roles, ["admin", "editor", "documents"])
      );
      let bytes: Buffer;
      try {
        const encoded = input.base64.replace(/^data:[^;]+;base64,/, "");
        if (!/^[A-Za-z0-9+/]*={0,2}$/.test(encoded))
          throw new Error("invalid base64");
        bytes = Buffer.from(encoded, "base64");
      } catch {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "base64 is invalid",
        });
      }
      if (bytes.length === 0 || bytes.length > 5 * 1024 * 1024) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Documents must be between 1 byte and 5 MiB",
        });
      }
      try {
        validateDocumentSignature(input.mime, bytes);
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error instanceof Error ? error.message : "Invalid document",
        });
      }
      let documentId = 0;
      await db.transaction(async tx => {
        const inserted = await tx.insert(portalDocuments).values({
          title: input.title,
          mime: input.mime,
          sizeBytes: bytes.length,
          content: bytes.toString("base64"),
          publication: "draft",
          accessScope: input.accessScope,
          uploadedBy: user.id,
        });
        documentId = Number(inserted[0]?.insertId);
        await tx.insert(portalAudit).values({
          recordId: null,
          actorId: user.id,
          actorOpenId: user.openId,
          action: "document.upload",
          reason: null,
          oldValue: null,
          newValue: {
            id: documentId,
            title: input.title,
            mime: input.mime,
            sizeBytes: bytes.length,
            publication: "draft",
            accessScope: input.accessScope,
          },
        });
      });
      return {
        id: documentId,
        title: input.title,
        mime: input.mime,
        sizeBytes: bytes.length,
        publication: "draft" as const,
        accessScope: input.accessScope,
      };
    }),

  /** Document publication has its own review gate; it never becomes public on upload. */
  documentTransition: protectedProcedure
    .input(documentTransitionInput)
    .mutation(async ({ ctx, input }) => {
      const db = await requireDb();
      const { user, roles } = await requireRoles(
        db,
        ctx,
        current =>
          canReview(current) ||
          current.has("editor") ||
          current.has("documents")
      );
      const rows = await db
        .select()
        .from(portalDocuments)
        .where(eq(portalDocuments.id, input.id))
        .limit(1);
      const document = rows[0];
      if (!document)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Document not found",
        });
      const current = document.publication as PortalPublication;
      const canSubmitDocument =
        current === "draft" &&
        input.publication === "review" &&
        canEditModule(roles, "documents");
      if (!canReview(roles) && !canSubmitDocument) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "Only an editor can submit a document or a reviewer can publish it",
        });
      }
      if (
        current === "published" &&
        input.publication === "draft" &&
        !input.reason
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unpublishing requires a reason",
        });
      }
      try {
        validateTransitionPermissions(
          current,
          input.publication,
          roles,
          "documents"
        );
        if (
          input.publication === "approved" ||
          input.publication === "published"
        ) {
          if (!document.title.trim())
            throw new Error("Document title is required");
        }
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            error instanceof Error
              ? error.message
              : "Invalid document transition",
        });
      }
      await db.transaction(async tx => {
        await tx
          .update(portalDocuments)
          .set({ publication: input.publication })
          .where(eq(portalDocuments.id, input.id));
        await tx.insert(portalAudit).values({
          recordId: null,
          actorId: user.id,
          actorOpenId: user.openId,
          action: `document.transition.${input.publication}`,
          reason: input.reason ?? null,
          oldValue: { id: document.id, publication: document.publication },
          newValue: { id: document.id, publication: input.publication },
        });
      });
      return { id: input.id, publication: input.publication };
    }),

  documentDownload: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const db = await requireDb();
      const rows = await db
        .select()
        .from(portalDocuments)
        .where(eq(portalDocuments.id, input.id))
        .limit(1);
      const document = rows[0];
      if (!document)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Documento não encontrado",
        });
      if (
        document.accessScope === "cism" ||
        document.publication !== "published"
      ) {
        const roles = await getRoles(db, ctx);
        if (
          !canDownloadDocument(
            document.publication,
            roles,
            document.accessScope
          )
        ) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message:
              "É necessário um papel interno autorizado para baixar este documento",
          });
        }
      }
      return {
        id: document.id,
        title: document.title,
        mime: document.mime,
        sizeBytes: document.sizeBytes,
        publication: document.publication,
        accessScope: document.accessScope,
        base64: document.content,
      };
    }),
});
