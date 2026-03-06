/*
  Warnings:

  - You are about to drop the column `creaedById` on the `AlertEvent` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `AlertEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AlertEvent" DROP CONSTRAINT "AlertEvent_creaedById_fkey";

-- AlterTable
ALTER TABLE "AlertEvent" DROP COLUMN "creaedById",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AlertEvent" ADD CONSTRAINT "AlertEvent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
