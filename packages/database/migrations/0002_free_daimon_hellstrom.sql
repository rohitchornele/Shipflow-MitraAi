CREATE TYPE "public"."github_pull_request_status" AS ENUM('pending', 'processing', 'reviewed', 'failed');--> statement-breakpoint
CREATE TABLE "github_pull_request" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"github_pull_request_id" bigint NOT NULL,
	"installation_id" integer NOT NULL,
	"repository_id" bigint NOT NULL,
	"repository_owner" varchar(255) NOT NULL,
	"repository_name" varchar(255) NOT NULL,
	"pr_number" integer NOT NULL,
	"title" varchar(500) NOT NULL,
	"author_login" varchar(255),
	"head_sha" varchar(64) NOT NULL,
	"base_branch" varchar(255) NOT NULL,
	"status" "github_pull_request_status" DEFAULT 'pending' NOT NULL,
	"review_comment" text,
	"review_model" varchar(100),
	"reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "github_pull_request_github_pr_id_idx" ON "github_pull_request" USING btree ("github_pull_request_id");--> statement-breakpoint
CREATE UNIQUE INDEX "github_pull_request_repo_pr_idx" ON "github_pull_request" USING btree ("repository_id","pr_number");