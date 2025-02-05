CREATE TYPE "public"."category_type" AS ENUM('income', 'expense');--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN "type" "category_type";