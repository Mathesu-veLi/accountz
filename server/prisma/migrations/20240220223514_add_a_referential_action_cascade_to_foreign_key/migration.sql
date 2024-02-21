-- DropForeignKey
ALTER TABLE "Passwords" DROP CONSTRAINT "Passwords_usersId_fkey";

-- AddForeignKey
ALTER TABLE "Passwords" ADD CONSTRAINT "Passwords_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
