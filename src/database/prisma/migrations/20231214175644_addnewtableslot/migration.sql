/*
  Warnings:

  - You are about to drop the column `userId` on the `verification` table. All the data in the column will be lost.
  - You are about to drop the `food` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `verification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "verification" DROP CONSTRAINT "verification_userId_fkey";

-- DropIndex
DROP INDEX "verification_userId_key";

-- AlterTable
ALTER TABLE "verification" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER;

-- DropTable
DROP TABLE "food";

-- CreateTable
CREATE TABLE "slot" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created_dt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_dt" TIMESTAMP(3) NOT NULL,
    "food_type" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "slot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "slot_uid_key" ON "slot"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "verification_user_id_key" ON "verification"("user_id");

-- AddForeignKey
ALTER TABLE "verification" ADD CONSTRAINT "verification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slot" ADD CONSTRAINT "slot_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
