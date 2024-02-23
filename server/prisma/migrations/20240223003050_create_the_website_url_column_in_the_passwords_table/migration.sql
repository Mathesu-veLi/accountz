/*
  Warnings:

  - A unique constraint covering the columns `[website,websiteUrl,email]` on the table `Passwords` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `websiteUrl` to the `Passwords` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Passwords_website_email_key";

-- AlterTable
ALTER TABLE "Passwords" ADD COLUMN     "websiteUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Passwords_website_websiteUrl_email_key" ON "Passwords"("website", "websiteUrl", "email");
