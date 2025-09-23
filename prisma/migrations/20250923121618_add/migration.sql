/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."FuelType" AS ENUM ('ESSENCE', 'DIESEL', 'HYBRIDE', 'ELECTRIQUE', 'GPL', 'PETROL');

-- CreateEnum
CREATE TYPE "public"."TransmissionType" AS ENUM ('MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC');

-- CreateEnum
CREATE TYPE "public"."BodyType" AS ENUM ('BERLINE', 'SUV', 'BREAK', 'COUPE', 'CABRIOLET', 'MONOSPACE', 'PICK_UP', 'UTILITAIRE', 'CONVERTIBLE', 'SEDAN');

-- CreateEnum
CREATE TYPE "public"."ConditionType" AS ENUM ('OCCASION', 'SANS_PLAQUE', 'RECONDITIONNE', 'NEUF');

-- CreateEnum
CREATE TYPE "public"."PlanType" AS ENUM ('MONTHLY');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "email" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subscriptionExpiry" TIMESTAMP(3),
ADD COLUMN     "whatsapp" TEXT;

-- CreateTable
CREATE TABLE "public"."Car" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "images" TEXT[],
    "whatsappNumber" TEXT NOT NULL,
    "fuel" "public"."FuelType",
    "transmission" "public"."TransmissionType",
    "bodyType" "public"."BodyType",
    "condition" "public"."ConditionType",
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planType" "public"."PlanType" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "paymentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Car_brand_idx" ON "public"."Car"("brand");

-- CreateIndex
CREATE INDEX "Car_model_idx" ON "public"."Car"("model");

-- CreateIndex
CREATE INDEX "Car_isActive_idx" ON "public"."Car"("isActive");

-- CreateIndex
CREATE INDEX "Car_price_idx" ON "public"."Car"("price");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_paymentId_key" ON "public"."Subscription"("paymentId");

-- CreateIndex
CREATE INDEX "Subscription_userId_isActive_idx" ON "public"."Subscription"("userId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Car" ADD CONSTRAINT "Car_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
