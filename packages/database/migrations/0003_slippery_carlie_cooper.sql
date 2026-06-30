CREATE TYPE "public"."github_repository_sync_status" AS ENUM('pending', 'syncing', 'synced', 'failed');--> statement-breakpoint
CREATE TABLE "github_repository_sync" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"installation_id" integer NOT NULL,
	"repository_id" bigint NOT NULL,
	"repository_owner" varchar(255) NOT NULL,
	"repository_name" varchar(255) NOT NULL,
	"default_branch" varchar(255) NOT NULL,
	"last_commit_sha" varchar(64),
	"status" "github_repository_sync_status" DEFAULT 'pending' NOT NULL,
	"chunk_count" integer DEFAULT 0 NOT NULL,
	"synced_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "github_repository_sync_repository_idx" ON "github_repository_sync" USING btree ("repository_id");