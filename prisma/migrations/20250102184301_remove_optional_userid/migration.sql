/*
  Warnings:

  - Made the column `userId` on table `Snippet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Snippet" ALTER COLUMN "userId" SET NOT NULL;
