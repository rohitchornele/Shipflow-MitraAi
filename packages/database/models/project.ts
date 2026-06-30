import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

import { user } from './auth-schema';

export const project = pgTable(
  'project',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    ownerId: varchar('owner_id', {
      length: 255,
    })
      .notNull()
      .references(() => user.id, {
        onDelete: 'cascade',
      }),

    name: varchar('name', {
      length: 150,
    }).notNull(),

    description: text('description'),

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
    ownerIdx: index('project_owner_idx').on(table.ownerId),
  })
);