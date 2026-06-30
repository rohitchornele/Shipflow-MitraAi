CREATE TABLE "repository" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"github_repository_id" text NOT NULL,
	"github_installation_id" text NOT NULL,
	"owner" varchar(100) NOT NULL,
	"name" varchar(150) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"default_branch" varchar(100) NOT NULL,
	"is_private" boolean DEFAULT true NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL,
	"is_connected" boolean DEFAULT true NOT NULL,
	"last_synced_at" timestamp with time zone,
	"last_indexed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "repository" ADD CONSTRAINT "repository_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "repository_project_idx" ON "repository" USING btree ("project_id");--> statement-breakpoint
CREATE UNIQUE INDEX "repository_project_repo_idx" ON "repository" USING btree ("project_id","github_repository_id");--> statement-breakpoint
CREATE INDEX "repository_full_name_idx" ON "repository" USING btree ("full_name");