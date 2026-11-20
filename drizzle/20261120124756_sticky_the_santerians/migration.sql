CREATE TABLE "answers" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"question_id" text NOT NULL,
	"question_version" integer NOT NULL,
	"selected_option_id" text NOT NULL,
	"is_correct" boolean NOT NULL,
	"mode" text NOT NULL,
	"answered_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"exam_session_id" text
);
--> statement-breakpoint
CREATE TABLE "bookmarks" (
	"user_id" text,
	"question_id" text,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookmarks_pkey" PRIMARY KEY("user_id","question_id")
);
--> statement-breakpoint
CREATE TABLE "calculators" (
	"id" text PRIMARY KEY,
	"slug" text NOT NULL CONSTRAINT "calculators_slug_key" UNIQUE,
	"name_hy" text NOT NULL,
	"config" json NOT NULL,
	"source" text NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "code_batch_specialties" (
	"batch_id" text,
	"specialty_id" text,
	CONSTRAINT "code_batch_specialties_pkey" PRIMARY KEY("batch_id","specialty_id")
);
--> statement-breakpoint
CREATE TABLE "code_batches" (
	"id" text PRIMARY KEY,
	"sponsor_id" text,
	"duration_days" integer NOT NULL,
	"expires_at" timestamp(3) with time zone NOT NULL,
	"type" text NOT NULL,
	"max_uses" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "codes" (
	"id" text PRIMARY KEY,
	"batch_id" text NOT NULL,
	"code" text NOT NULL CONSTRAINT "codes_code_key" UNIQUE,
	"uses" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entitlements" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"specialty_id" text,
	"source" text NOT NULL,
	"source_ref" text NOT NULL,
	"starts_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"ends_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "error_reports" (
	"id" text PRIMARY KEY,
	"user_id" text,
	"question_id" text NOT NULL,
	"type" text NOT NULL,
	"text" text NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"resolved_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "exam_sessions" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"specialty_id" text NOT NULL,
	"question_ids" text[] DEFAULT '{}'::text[] NOT NULL,
	"started_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp(3) with time zone,
	"duration_limit" integer NOT NULL,
	"score" double precision,
	"passed" boolean,
	CONSTRAINT "exam_sessions_question_ids_no_nulls" CHECK (array_position("question_ids", NULL) IS NULL)
);
--> statement-breakpoint
CREATE TABLE "organization_admins" (
	"organization_id" text,
	"user_id" text,
	CONSTRAINT "organization_admins_pkey" PRIMARY KEY("organization_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"license_count" integer NOT NULL,
	"license_until" timestamp(3) with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question_topics" (
	"question_id" text,
	"topic_id" text,
	CONSTRAINT "question_topics_pkey" PRIMARY KEY("question_id","topic_id")
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" text PRIMARY KEY,
	"specialty_id" text NOT NULL,
	"section_id" text NOT NULL,
	"number" integer NOT NULL,
	"stem" text NOT NULL,
	"options" json DEFAULT '[]' NOT NULL,
	"sources" json DEFAULT '[]' NOT NULL,
	"correct_option_id" text NOT NULL,
	"explanation" text NOT NULL,
	"note" text,
	"shuffle" boolean DEFAULT true NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"review_comment" text,
	"version" integer DEFAULT 1 NOT NULL,
	"updated_at" timestamp(3) with time zone NOT NULL,
	"reviewed_by" text,
	"reviewed_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "review_queue" (
	"user_id" text,
	"question_id" text,
	"stage" integer DEFAULT 0 NOT NULL,
	"next_review_at" timestamp(3) with time zone NOT NULL,
	CONSTRAINT "review_queue_pkey" PRIMARY KEY("user_id","question_id")
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" text PRIMARY KEY,
	"specialty_id" text NOT NULL,
	"name_hy" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "specialties" (
	"id" text PRIMARY KEY,
	"name_hy" text NOT NULL,
	"slug" text NOT NULL CONSTRAINT "specialties_slug_key" UNIQUE,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"sponsor_id" text,
	"sponsor_until" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "sponsors" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"logo_url" text NOT NULL,
	"website" text NOT NULL,
	"contact" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"id" text PRIMARY KEY,
	"specialty_id" text NOT NULL,
	"name_hy" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY,
	"phone" text CONSTRAINT "users_phone_key" UNIQUE,
	"email" text CONSTRAINT "users_email_key" UNIQUE,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"specialty_id" text NOT NULL,
	"professional_status" text NOT NULL,
	"workplace" text,
	"registry_number" text,
	"hcp_verified" text DEFAULT 'none' NOT NULL,
	"organization_id" text,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"consent_terms_at" timestamp(3) with time zone NOT NULL,
	"consent_marketing" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE INDEX "answers_user_id_idx_6c952402" ON "answers" ("user_id");--> statement-breakpoint
CREATE INDEX "answers_user_id_answered_at_idx_7771bd3c" ON "answers" ("user_id","answered_at");--> statement-breakpoint
CREATE INDEX "answers_user_id_question_id_answered_at_idx_faa91429" ON "answers" ("user_id","question_id","answered_at");--> statement-breakpoint
CREATE INDEX "answers_question_id_idx_fcfb223c" ON "answers" ("question_id");--> statement-breakpoint
CREATE INDEX "answers_exam_session_id_idx_d2694f5f" ON "answers" ("exam_session_id");--> statement-breakpoint
CREATE INDEX "bookmarks_user_id_idx_6c952402" ON "bookmarks" ("user_id");--> statement-breakpoint
CREATE INDEX "bookmarks_user_id_created_at_idx_b562028f" ON "bookmarks" ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "bookmarks_question_id_idx_fcfb223c" ON "bookmarks" ("question_id");--> statement-breakpoint
CREATE INDEX "calculators_is_published_idx_524f5def" ON "calculators" ("is_published");--> statement-breakpoint
CREATE INDEX "code_batch_specialties_batch_id_idx_49ba28fa" ON "code_batch_specialties" ("batch_id");--> statement-breakpoint
CREATE INDEX "code_batch_specialties_specialty_id_idx_04170370" ON "code_batch_specialties" ("specialty_id");--> statement-breakpoint
CREATE INDEX "code_batches_sponsor_id_idx_5dec6ff5" ON "code_batches" ("sponsor_id");--> statement-breakpoint
CREATE INDEX "code_batches_expires_at_idx_35365ada" ON "code_batches" ("expires_at");--> statement-breakpoint
CREATE INDEX "codes_batch_id_idx_49ba28fa" ON "codes" ("batch_id");--> statement-breakpoint
CREATE INDEX "entitlements_user_id_idx_6c952402" ON "entitlements" ("user_id");--> statement-breakpoint
CREATE INDEX "entitlements_user_id_specialty_id_ends_at_idx_1e5b227f" ON "entitlements" ("user_id","specialty_id","ends_at");--> statement-breakpoint
CREATE INDEX "entitlements_specialty_id_idx_04170370" ON "entitlements" ("specialty_id");--> statement-breakpoint
CREATE INDEX "entitlements_source_source_ref_idx_5f6ab958" ON "entitlements" ("source","source_ref");--> statement-breakpoint
CREATE INDEX "error_reports_status_created_at_idx_1bbe8adf" ON "error_reports" ("status","created_at");--> statement-breakpoint
CREATE INDEX "error_reports_question_id_idx_fcfb223c" ON "error_reports" ("question_id");--> statement-breakpoint
CREATE INDEX "error_reports_user_id_idx_6c952402" ON "error_reports" ("user_id");--> statement-breakpoint
CREATE INDEX "exam_sessions_user_id_idx_6c952402" ON "exam_sessions" ("user_id");--> statement-breakpoint
CREATE INDEX "exam_sessions_user_id_started_at_idx_beb66913" ON "exam_sessions" ("user_id","started_at");--> statement-breakpoint
CREATE INDEX "exam_sessions_specialty_id_idx_04170370" ON "exam_sessions" ("specialty_id");--> statement-breakpoint
CREATE INDEX "organization_admins_organization_id_idx_1a5cd3f5" ON "organization_admins" ("organization_id");--> statement-breakpoint
CREATE INDEX "organization_admins_user_id_idx_6c952402" ON "organization_admins" ("user_id");--> statement-breakpoint
CREATE INDEX "question_topics_question_id_idx_fcfb223c" ON "question_topics" ("question_id");--> statement-breakpoint
CREATE INDEX "question_topics_topic_id_idx_334b0e8b" ON "question_topics" ("topic_id");--> statement-breakpoint
CREATE INDEX "questions_specialty_id_idx_04170370" ON "questions" ("specialty_id");--> statement-breakpoint
CREATE INDEX "questions_specialty_id_status_number_idx_48ef38b1" ON "questions" ("specialty_id","status","number");--> statement-breakpoint
CREATE INDEX "questions_section_id_idx_13db6de7" ON "questions" ("section_id");--> statement-breakpoint
CREATE INDEX "questions_section_id_status_idx_a0e1b6e6" ON "questions" ("section_id","status");--> statement-breakpoint
CREATE INDEX "questions_status_updated_at_idx_b01876cb" ON "questions" ("status","updated_at");--> statement-breakpoint
CREATE INDEX "questions_reviewed_by_idx_ef840284" ON "questions" ("reviewed_by");--> statement-breakpoint
CREATE INDEX "review_queue_user_id_idx_6c952402" ON "review_queue" ("user_id");--> statement-breakpoint
CREATE INDEX "review_queue_user_id_next_review_at_idx_8ea0b1b0" ON "review_queue" ("user_id","next_review_at");--> statement-breakpoint
CREATE INDEX "review_queue_question_id_idx_fcfb223c" ON "review_queue" ("question_id");--> statement-breakpoint
CREATE INDEX "sections_specialty_id_idx_04170370" ON "sections" ("specialty_id");--> statement-breakpoint
CREATE INDEX "sections_specialty_id_sort_order_idx_708de791" ON "sections" ("specialty_id","sort_order");--> statement-breakpoint
CREATE INDEX "specialties_is_published_sort_order_idx_b75878b6" ON "specialties" ("is_published","sort_order");--> statement-breakpoint
CREATE INDEX "specialties_sponsor_id_idx_5dec6ff5" ON "specialties" ("sponsor_id");--> statement-breakpoint
CREATE INDEX "topics_specialty_id_idx_04170370" ON "topics" ("specialty_id");--> statement-breakpoint
CREATE INDEX "users_specialty_id_idx_04170370" ON "users" ("specialty_id");--> statement-breakpoint
CREATE INDEX "users_organization_id_idx_1a5cd3f5" ON "users" ("organization_id");--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id");--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_exam_session_id_fkey" FOREIGN KEY ("exam_session_id") REFERENCES "exam_sessions"("id");--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id");--> statement-breakpoint
ALTER TABLE "code_batch_specialties" ADD CONSTRAINT "code_batch_specialties_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "code_batches"("id");--> statement-breakpoint
ALTER TABLE "code_batch_specialties" ADD CONSTRAINT "code_batch_specialties_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id");--> statement-breakpoint
ALTER TABLE "code_batches" ADD CONSTRAINT "code_batches_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "sponsors"("id");--> statement-breakpoint
ALTER TABLE "codes" ADD CONSTRAINT "codes_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "code_batches"("id");--> statement-breakpoint
ALTER TABLE "entitlements" ADD CONSTRAINT "entitlements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "entitlements" ADD CONSTRAINT "entitlements_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id");--> statement-breakpoint
ALTER TABLE "error_reports" ADD CONSTRAINT "error_reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "error_reports" ADD CONSTRAINT "error_reports_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id");--> statement-breakpoint
ALTER TABLE "exam_sessions" ADD CONSTRAINT "exam_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "exam_sessions" ADD CONSTRAINT "exam_sessions_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id");--> statement-breakpoint
ALTER TABLE "organization_admins" ADD CONSTRAINT "organization_admins_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "organization_admins" ADD CONSTRAINT "organization_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "question_topics" ADD CONSTRAINT "question_topics_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id");--> statement-breakpoint
ALTER TABLE "question_topics" ADD CONSTRAINT "question_topics_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id");--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id");--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id");--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "review_queue" ADD CONSTRAINT "review_queue_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "review_queue" ADD CONSTRAINT "review_queue_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id");--> statement-breakpoint
ALTER TABLE "sections" ADD CONSTRAINT "sections_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id");--> statement-breakpoint
ALTER TABLE "specialties" ADD CONSTRAINT "specialties_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "sponsors"("id");--> statement-breakpoint
ALTER TABLE "topics" ADD CONSTRAINT "topics_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id");