/*
  Warnings:

  - Added the required column `quantity` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "unit_price" INTEGER NOT NULL;
