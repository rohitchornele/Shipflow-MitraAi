CREATE TYPE "public"."feature_priority" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."feature_status" AS ENUM('draft', 'requirement_gathering', 'requirements_approved', 'prd_generated', 'prd_approved', 'tasks_generated', 'in_development', 'pr_review', 'ready_for_release', 'released', 'archived');--> statement-breakpoint
CREATE TABLE "feature" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"repositoryId" uuid,
	"createdBy" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" "feature_status" DEFAULT 'draft' NOT NULL,
	"priority" "feature_priority" DEFAULT 'medium' NOT NULL,
	"isArchived" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "feature" ADD CONSTRAINT "feature_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feature" ADD CONSTRAINT "feature_repositoryId_repository_id_fk" FOREIGN KEY ("repositoryId") REFERENCES "public"."repository"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feature" ADD CONSTRAINT "feature_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "feature_project_idx" ON "feature" USING btree ("projectId");--> statement-breakpoint
CREATE INDEX "feature_repository_idx" ON "feature" USING btree ("repositoryId");--> statement-breakpoint
CREATE INDEX "feature_status_idx" ON "feature" USING btree ("status");