import { text } from 'drizzle-orm/pg-core';
import {
  pgTable,
  uuid,
  bigint,
  integer,
  varchar,
  timestamp,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const githubPullRequestStatusEnum = pgEnum(
  'github_pull_request_status',
  ['pending', 'processing', 'reviewed', 'failed']
);

export const githubPullRequest = pgTable(
  'github_pull_request',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    githubPullRequestId: bigint('github_pull_request_id', {
      mode: 'number',
    }).notNull(),

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

    prNumber: integer('pr_number').notNull(),

    title: varchar('title', {
      length: 500,
    }).notNull(),

    authorLogin: varchar('author_login', {
      length: 255,
    }),

    headSha: varchar('head_sha', {
      length: 64,
    }).notNull(),

    baseBranch: varchar('base_branch', {
      length: 255,
    }).notNull(),

    status: githubPullRequestStatusEnum('status').notNull().default('pending'),

    reviewComment: text('review_comment'),
    
    reviewModel: varchar('review_model', {
      length: 100,
    }),

    reviewedAt: timestamp('reviewed_at', {
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
    githubPrIdUnique: uniqueIndex('github_pull_request_github_pr_id_idx').on(
      table.githubPullRequestId
    ),

    repositoryPrUnique: uniqueIndex('github_pull_request_repo_pr_idx').on(
      table.repositoryId,
      table.prNumber
    ),
  })
);
