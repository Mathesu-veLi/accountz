/*
  Warnings:

  - You are about to drop the `Passwords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Passwords" DROP CONSTRAINT "Passwords_usersId_fkey";

-- DropTable
DROP TABLE "Passwords";

-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "website" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_website_websiteUrl_email_key" ON "Accounts"("website", "websiteUrl", "email");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
