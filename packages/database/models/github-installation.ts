import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const githubInstallation = pgTable('github_installation', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: varchar('user_id', { length: 255 })
    .notNull()
    .unique()
    .references(() => user.id, {
      onDelete: 'cascade',
    }),

  installationId: integer('installation_id').notNull(),

  accountLogin: varchar('account_login', {
    length: 255,
  }),

  accountType: varchar('account_type', {
    length: 100,
  }),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
