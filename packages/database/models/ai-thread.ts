import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { feature } from './feature';
import { user } from './auth-schema';



export const aiThreadTypeEnum = pgEnum(
  'ai_thread_type',
  [
    'requirement_gathering',
    'prd_generation',
    'task_generation',
    'review',
    'general',
  ]
);


export const aiThreadStatusEnum = pgEnum(
  'ai_thread_status',
  [
    'active',
    'completed',
    'archived',
  ]
);


export const aiThreads = pgTable(
  'ai_threads',
  {
    id: uuid().defaultRandom().primaryKey(),

    featureId: uuid()
      .notNull()
      .references(() => feature.id, {
        onDelete: 'cascade',
      }),

    type: aiThreadTypeEnum()
      .notNull()
      .default('requirement_gathering'),

    title: text().notNull(),

    status: aiThreadStatusEnum()
      .notNull()
      .default('active'),

    createdBy: text()
      .notNull()
      .references(() => user.id),

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
      'ai_threads_feature_idx'
    ).on(table.featureId),

    statusIdx: index(
      'ai_threads_status_idx'
    ).on(table.status),

    typeIdx: index(
      'ai_threads_type_idx'
    ).on(table.type),
  })
);