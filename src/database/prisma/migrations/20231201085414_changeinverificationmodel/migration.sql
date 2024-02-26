/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `verification` will be added. If there are existing duplicate values, this will fail.
  - The required column `uid` was added to the `verification` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "verification" DROP CONSTRAINT "verification_userId_fkey";

-- AlterTable
ALTER TABLE "verification" ADD COLUMN     "uid" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "verification_uid_key" ON "verification"("uid");

-- AddForeignKey
ALTER TABLE "verification" ADD CONSTRAINT "verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
