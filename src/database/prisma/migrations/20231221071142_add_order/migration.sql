/*
  Warnings:

  - You are about to drop the column `comment` on the `rating` table. All the data in the column will be lost.
  - You are about to drop the column `slot_id` on the `rating` table. All the data in the column will be lost.
  - You are about to drop the `slot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_slot_id_fkey";

-- DropForeignKey
ALTER TABLE "slot" DROP CONSTRAINT "slot_user_id_fkey";

-- AlterTable
ALTER TABLE "rating" DROP COLUMN "comment",
DROP COLUMN "slot_id",
ADD COLUMN     "order_id" INTEGER;

-- DropTable
DROP TABLE "slot";

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "biriyani_type" VARCHAR(255),
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_uid_key" ON "order"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetail_uid_key" ON "OrderDetail"("uid");

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
