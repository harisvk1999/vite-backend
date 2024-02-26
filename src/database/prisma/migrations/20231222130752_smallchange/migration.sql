/*
  Warnings:

  - You are about to drop the column `user_id` on the `rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `item_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Made the column `order_id` on table `rating` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_order_id_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_user_id_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "item_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "rating" DROP COLUMN "user_id",
ALTER COLUMN "order_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rating_order_id_key" ON "rating"("order_id");

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
