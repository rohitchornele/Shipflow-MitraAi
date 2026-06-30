import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { feature } from './feature';

export const featureContext = pgTable(
  'feature_context',
  {
    id: uuid().defaultRandom().primaryKey(),

    featureId: uuid()
      .notNull()
      .references(() => feature.id, {
        onDelete: 'cascade',
      }),

    summary: text(),

    requirements: jsonb().$type<Record<string, unknown>>(),

    missingItems: jsonb().$type<string[]>(),

    completion: integer()
      .default(0)
      .notNull(),

    version: integer()
      .default(1)
      .notNull(),

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
    featureIdx: index(
      'feature_context_feature_idx'
    ).on(table.featureId),
  })
);