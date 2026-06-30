import {
  pgTable,
  uuid,
  integer,
  bigint,
  varchar,
  timestamp,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const githubRepositorySyncStatusEnum = pgEnum(
  'github_repository_sync_status',
  ['pending', 'syncing', 'synced', 'failed']
);

export const githubRepositorySync = pgTable(
  'github_repository_sync',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    installationId: integer('installation_id').notNull(),

    repositoryId: bigint('repository_id', {
      mode: 'number',
    }).notNull(),

    repositoryOwner: varchar('repository_owner', {
      length: 255,
    }).notNull(),

    repositoryName: varchar('repository_name', {
      length: 255,
    }).notNull(),

    defaultBranch: varchar('default_branch', {
      length: 255,
    }).notNull(),

    lastCommitSha: varchar('last_commit_sha', {
      length: 64,
    }),

    status: githubRepositorySyncStatusEnum('status')
      .notNull()
      .default('pending'),

    chunkCount: integer('chunk_count').notNull().default(0),

    syncedAt: timestamp('synced_at', {
      withTimezone: true,
    }),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp('updated_at', {
      withTimezone: true,
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    repositoryUnique: uniqueIndex('github_repository_sync_repository_idx').on(
      table.repositoryId
    ),
  })
);
