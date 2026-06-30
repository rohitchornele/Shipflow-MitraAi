import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { aiThreads } from './ai-thread';
import { integer } from 'drizzle-orm/pg-core';

/* -------------------------------------------------------------------------- */
/*                               Message Role                                 */
/* -------------------------------------------------------------------------- */

export const aiMessageRoleEnum = pgEnum(
  'ai_message_role',
  [
    'system',
    'user',
    'assistant',
    'tool',
  ]
);

/* -------------------------------------------------------------------------- */
/*                                AI Message                                  */
/* -------------------------------------------------------------------------- */

export const aiMessages = pgTable(
  'ai_messages',
  {
    id: uuid().defaultRandom().primaryKey(),

    threadId: uuid()
      .notNull()
      .references(() => aiThreads.id, {
        onDelete: 'cascade',
      }),

    role: aiMessageRoleEnum().notNull(),

    content: text().notNull(),

    sequence: integer().notNull(),

    metadata: jsonb(),

    createdAt: timestamp({
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    threadIdx: index(
      'ai_messages_thread_idx'
    ).on(table.threadId),

    createdAtIdx: index(
      'ai_messages_created_at_idx'
    ).on(table.createdAt),
  })
);