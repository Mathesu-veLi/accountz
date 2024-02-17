-- CreateTable
CREATE TABLE "Passwords" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "website" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Passwords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passwords_website_email_key" ON "Passwords"("website", "email");

-- AddForeignKey
ALTER TABLE "Passwords" ADD CONSTRAINT "Passwords_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
