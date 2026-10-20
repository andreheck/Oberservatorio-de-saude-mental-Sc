import {
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  mediumtext,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * The starter's users.role remains authoritative for the built-in admin role;
 * userPermissions adds portal roles without changing the authentication flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const PORTAL_ROLES = [
  "admin",
  "editor",
  "finance",
  "inspections",
  "documents",
  "reviewer",
  "reader",
] as const;
export type PortalRole = (typeof PORTAL_ROLES)[number];

export const PORTAL_PUBLICATIONS = [
  "draft",
  "review",
  "approved",
  "published",
] as const;
export type PortalPublication = (typeof PORTAL_PUBLICATIONS)[number];

export const userPermissions = mysqlTable(
  "userPermissions",
  {
    userId: int("userId").notNull(),
    role: mysqlEnum("role", [...PORTAL_ROLES]).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    pk: primaryKey({ columns: [table.userId, table.role] }),
    userIdx: index("userPermissions_user_idx").on(table.userId),
  })
);

export const portalSettings = mysqlTable("portalSettings", {
  id: int("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  subtitle: text("subtitle").notNull(),
  signature: text("signature").notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull().default(""),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  updatedBy: int("updatedBy"),
});

export const portalRecords = mysqlTable(
  "portalRecords",
  {
    id: int("id").autoincrement().primaryKey(),
    module: varchar("module", { length: 80 }).notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: varchar("status", { length: 120 }).notNull(),
    publication: mysqlEnum("publication", [...PORTAL_PUBLICATIONS])
      .default("draft")
      .notNull(),
    sourceName: varchar("sourceName", { length: 255 }).notNull(),
    sourceUrl: varchar("sourceUrl", { length: 2048 }).notNull(),
    referencePeriod: varchar("referencePeriod", { length: 120 }).notNull(),
    verifiedAt: timestamp("verifiedAt"),
    data: json("data").$type<Record<string, unknown>>().notNull(),
    createdBy: int("createdBy").notNull(),
    updatedBy: int("updatedBy").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    publicationIdx: index("portalRecords_publication_idx").on(
      table.publication,
      table.module
    ),
    moduleIdx: index("portalRecords_module_idx").on(table.module),
  })
);

export const portalEvents = mysqlTable(
  "portalEvents",
  {
    id: int("id").autoincrement().primaryKey(),
    recordId: int("recordId").notNull(),
    description: text("description").notNull(),
    occurredAt: timestamp("occurredAt").notNull(),
    documentId: int("documentId"),
    authorId: int("authorId"),
    authorName: varchar("authorName", { length: 320 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => ({
    recordIdx: index("portalEvents_record_idx").on(
      table.recordId,
      table.occurredAt
    ),
  })
);

export const portalAudit = mysqlTable(
  "portalAudit",
  {
    id: int("id").autoincrement().primaryKey(),
    recordId: int("recordId"),
    actorId: int("actorId").notNull(),
    actorOpenId: varchar("actorOpenId", { length: 64 }).notNull(),
    action: varchar("action", { length: 80 }).notNull(),
    reason: text("reason"),
    oldValue: json("oldValue").$type<Record<string, unknown> | null>(),
    newValue: json("newValue").$type<Record<string, unknown> | null>(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => ({
    recordIdx: index("portalAudit_record_idx").on(
      table.recordId,
      table.createdAt
    ),
    actorIdx: index("portalAudit_actor_idx").on(table.actorId, table.createdAt),
  })
);

export const portalDocuments = mysqlTable(
  "portalDocuments",
  {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    mime: varchar("mime", { length: 80 }).notNull(),
    sizeBytes: int("sizeBytes").notNull(),
    // Base64 keeps the upload in the managed relational database; no public object URL is created.
    content: mediumtext("content").notNull(),
    publication: mysqlEnum("publication", [...PORTAL_PUBLICATIONS])
      .default("draft")
      .notNull(),
    uploadedBy: int("uploadedBy").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    publicationIdx: index("portalDocuments_publication_idx").on(
      table.publication
    ),
  })
);

export type PortalRecord = typeof portalRecords.$inferSelect;
export type InsertPortalRecord = typeof portalRecords.$inferInsert;
export type PortalEvent = typeof portalEvents.$inferSelect;
export type PortalAudit = typeof portalAudit.$inferSelect;
export type PortalDocument = typeof portalDocuments.$inferSelect;
