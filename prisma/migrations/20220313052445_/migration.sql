/*
  Warnings:

  - You are about to drop the column `salt` on the `Identity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Identity" DROP COLUMN "salt";
