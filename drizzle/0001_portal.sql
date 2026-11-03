CREATE TABLE `portalAudit` (
	`id` int AUTO_INCREMENT NOT NULL,
	`recordId` int,
	`actorId` int NOT NULL,
	`actorOpenId` varchar(64) NOT NULL,
	`action` varchar(80) NOT NULL,
	`reason` text,
	`oldValue` json,
	`newValue` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `portalAudit_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portalDocuments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`mime` varchar(80) NOT NULL,
	`sizeBytes` int NOT NULL,
	`content` mediumtext NOT NULL,
	`publication` enum('draft','review','approved','published') NOT NULL DEFAULT 'draft',
	`uploadedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portalDocuments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portalEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`recordId` int NOT NULL,
	`description` text NOT NULL,
	`occurredAt` timestamp NOT NULL,
	`documentId` int,
	`authorId` int,
	`authorName` varchar(320) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `portalEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portalRecords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`module` varchar(80) NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`status` varchar(120) NOT NULL,
	`publication` enum('draft','review','approved','published') NOT NULL DEFAULT 'draft',
	`sourceName` varchar(255) NOT NULL,
	`sourceUrl` varchar(2048) NOT NULL,
	`referencePeriod` varchar(120) NOT NULL,
	`verifiedAt` timestamp,
	`data` json NOT NULL,
	`createdBy` int NOT NULL,
	`updatedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portalRecords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portalSettings` (
	`id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`subtitle` text NOT NULL,
	`signature` text NOT NULL,
	`contactEmail` varchar(320) NOT NULL DEFAULT '',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` int,
	CONSTRAINT `portalSettings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userPermissions` (
	`userId` int NOT NULL,
	`role` enum('admin','editor','finance','inspections','documents','reviewer','reader') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userPermissions_userId_role_pk` PRIMARY KEY(`userId`,`role`)
);
--> statement-breakpoint
CREATE INDEX `portalAudit_record_idx` ON `portalAudit` (`recordId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `portalAudit_actor_idx` ON `portalAudit` (`actorId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `portalDocuments_publication_idx` ON `portalDocuments` (`publication`);--> statement-breakpoint
CREATE INDEX `portalEvents_record_idx` ON `portalEvents` (`recordId`,`occurredAt`);--> statement-breakpoint
CREATE INDEX `portalRecords_publication_idx` ON `portalRecords` (`publication`,`module`);--> statement-breakpoint
CREATE INDEX `portalRecords_module_idx` ON `portalRecords` (`module`);--> statement-breakpoint
CREATE INDEX `userPermissions_user_idx` ON `userPermissions` (`userId`);