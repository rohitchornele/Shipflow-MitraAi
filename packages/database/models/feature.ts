import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { project } from './project';
import { repository } from './repository';
import { user } from './auth-schema';

/* -------------------------------------------------------------------------- */
/*                                Feature Status                              */
/* -------------------------------------------------------------------------- */

export const featureStatusEnum = pgEnum('feature_status', [
  'draft',

  'requirement_gathering',

  'requirements_approved',

  'prd_generated',

  'prd_approved',

  'tasks_generated',

  'in_development',

  'pr_review',

  'ready_for_release',

  'released',

  'archived',
]);

export const featurePriorityEnum = pgEnum('feature_priority', [
  'low',
  'medium',
  'high',
  'critical',
]);

/* -------------------------------------------------------------------------- */
/*                                   Feature                                  */
/* -------------------------------------------------------------------------- */

export const feature = pgTable(
  'feature',
  {
    id: uuid().defaultRandom().primaryKey(),

    projectId: uuid()
      .notNull()
      .references(() => project.id, {
        onDelete: 'cascade',
      }),

    repositoryId: uuid().references(() => repository.id, {
      onDelete: 'set null',
    }),

    createdBy: text()
      .notNull()
      .references(() => user.id),

    title: text().notNull(),

    description: text(),

    status: featureStatusEnum().default('draft').notNull(),

    priority: featurePriorityEnum().default('medium').notNull(),

    isArchived: boolean().default(false).notNull(),

    createdAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    projectIdx: index('feature_project_idx').on(table.projectId),

    repositoryIdx: index('feature_repository_idx').on(table.repositoryId),

    statusIdx: index('feature_status_idx').on(table.status),
  })
);
