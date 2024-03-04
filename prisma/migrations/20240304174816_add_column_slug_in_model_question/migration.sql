/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `questions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "questions_slug_key" ON "questions"("slug");
