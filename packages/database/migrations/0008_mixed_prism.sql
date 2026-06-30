CREATE TYPE "public"."ai_thread_status" AS ENUM('active', 'completed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."ai_thread_type" AS ENUM('requirement_gathering', 'prd_generation', 'task_generation', 'review', 'general');--> statement-breakpoint
CREATE TABLE "ai_threads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"featureId" uuid NOT NULL,
	"type" "ai_thread_type" DEFAULT 'requirement_gathering' NOT NULL,
	"title" text NOT NULL,
	"status" "ai_thread_status" DEFAULT 'active' NOT NULL,
	"createdBy" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_threads" ADD CONSTRAINT "ai_threads_featureId_feature_id_fk" FOREIGN KEY ("featureId") REFERENCES "public"."feature"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_threads" ADD CONSTRAINT "ai_threads_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ai_threads_feature_idx" ON "ai_threads" USING btree ("featureId");--> statement-breakpoint
CREATE INDEX "ai_threads_status_idx" ON "ai_threads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "ai_threads_type_idx" ON "ai_threads" USING btree ("type");