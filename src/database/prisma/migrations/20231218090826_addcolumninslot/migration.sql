/*
  Warnings:

  - Added the required column `add_on` to the `slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "slot" ADD COLUMN     "add_on" VARCHAR(255) NOT NULL,
ADD COLUMN     "quantity" VARCHAR(255) NOT NULL;
