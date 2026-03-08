/*
  Warnings:

  - Made the column `fromStatus` on table `AlertEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AlertEvent" ALTER COLUMN "fromStatus" SET NOT NULL;
