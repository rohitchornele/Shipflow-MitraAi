import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

import { project } from './project';
import { user } from './auth-schema';

export const projectMemberRoleEnum = pgEnum(
  'project_member_role',
  [
    'owner',
    'admin',
    'developer',
    'viewer',
  ]
);

export const projectMember = pgTable(
  'project_member',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    projectId: uuid('project_id')
      .notNull()
      .references(() => project.id, {
        onDelete: 'cascade',
      }),

    userId: varchar('user_id', {
      length: 255,
    })
      .notNull()
      .references(() => user.id, {
        onDelete: 'cascade',
      }),

    role: projectMemberRoleEnum('role')
      .notNull()
      .default('developer'),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    projectUserUnique: uniqueIndex(
      'project_member_project_user_idx'
    ).on(table.projectId, table.userId),

    projectIdx: index(
      'project_member_project_idx'
    ).on(table.projectId),

    userIdx: index(
      'project_member_user_idx'
    ).on(table.userId),
  })
);