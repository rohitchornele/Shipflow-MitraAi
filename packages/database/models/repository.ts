import {
  pgTable,
  uuid,
  text,
  varchar,
  boolean,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { project } from './project';


export const repository = pgTable(
  'repository',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    projectId: uuid('project_id')
      .notNull()
      .references(() => project.id, {
        onDelete: 'cascade',
      }),

    githubRepositoryId: text(
      'github_repository_id'
    ).notNull(),

    githubInstallationId: text(
      'github_installation_id'
    ).notNull(),

    owner: varchar('owner', {
      length: 100,
    }).notNull(),

    name: varchar('name', {
      length: 150,
    }).notNull(),

    fullName: varchar('full_name', {
      length: 255,
    }).notNull(),

    defaultBranch: varchar(
      'default_branch',
      {
        length: 100,
      }
    ).notNull(),

    isPrivate: boolean('is_private')
      .default(true)
      .notNull(),

    isArchived: boolean('is_archived')
      .default(false)
      .notNull(),

    isConnected: boolean('is_connected')
      .default(true)
      .notNull(),

    lastSyncedAt: timestamp(
      'last_synced_at',
      {
        withTimezone: true,
      }
    ),

    lastIndexedAt: timestamp(
      'last_indexed_at',
      {
        withTimezone: true,
      }
    ),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', {
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    projectIdx: index(
      'repository_project_idx'
    ).on(table.projectId),

    repositoryUnique: uniqueIndex(
      'repository_project_repo_idx'
    ).on(
      table.projectId,
      table.githubRepositoryId
    ),

    fullNameIdx: index(
      'repository_full_name_idx'
    ).on(table.fullName),
  })
);