/*
  Warnings:

  - You are about to drop the `_carriedForwardTo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[meetingId]` on the table `MeetingStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_carriedForwardTo" DROP CONSTRAINT "_carriedForwardTo_A_fkey";

-- DropForeignKey
ALTER TABLE "_carriedForwardTo" DROP CONSTRAINT "_carriedForwardTo_B_fkey";

-- AlterTable
ALTER TABLE "Meeting" ALTER COLUMN "meetingNumber" SET DEFAULT 0;

-- DropTable
DROP TABLE "_carriedForwardTo";

-- CreateIndex
CREATE UNIQUE INDEX "MeetingStatus_meetingId_key" ON "MeetingStatus"("meetingId");
