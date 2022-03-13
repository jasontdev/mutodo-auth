/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Identity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Identity_email_key" ON "Identity"("email");
