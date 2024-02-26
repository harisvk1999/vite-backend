/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `item` will be added. If there are existing duplicate values, this will fail.
  - The required column `uid` was added to the `item` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "item_uid_key" ON "item"("uid");
