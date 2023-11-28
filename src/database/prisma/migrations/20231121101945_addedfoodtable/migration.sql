-- CreateTable
CREATE TABLE "food" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" VARCHAR(255),
    "created_dt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_dt" TIMESTAMP(3) NOT NULL,
    "type" VARCHAR(255) NOT NULL,

    CONSTRAINT "food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "food_uid_key" ON "food"("uid");
