/*
  Warnings:

  - You are about to drop the column `isActive` on the `Car` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('ACTIVE', 'SOLD', 'CANCELLED');

-- DropIndex
DROP INDEX "Car_isActive_idx";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "isActive",
ADD COLUMN     "status" "CarStatus" NOT NULL DEFAULT 'ACTIVE';
