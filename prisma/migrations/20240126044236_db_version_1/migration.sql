-- CreateEnum
CREATE TYPE "Types" AS ENUM ('MANCO', 'FINANCE', 'PTL');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'IN_DEVELOPMENT', 'Awaiting_Invoicing', 'CLOSED');

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "meetingTypeId" TEXT NOT NULL,
    "meetingType" "Types" NOT NULL DEFAULT 'MANCO',
    "meetingNumber" INTEGER NOT NULL,
    "meetingDate" TIMESTAMP(3) NOT NULL,
    "meetingTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingItem" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeetingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingStatus" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "meetingItemId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "action_required" TEXT NOT NULL,
    "responsible_person" TEXT NOT NULL,

    CONSTRAINT "MeetingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_carriedForwardTo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MeetingStatus_meetingItemId_key" ON "MeetingStatus"("meetingItemId");

-- CreateIndex
CREATE UNIQUE INDEX "_carriedForwardTo_AB_unique" ON "_carriedForwardTo"("A", "B");

-- CreateIndex
CREATE INDEX "_carriedForwardTo_B_index" ON "_carriedForwardTo"("B");

-- AddForeignKey
ALTER TABLE "MeetingItem" ADD CONSTRAINT "MeetingItem_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingStatus" ADD CONSTRAINT "MeetingStatus_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingStatus" ADD CONSTRAINT "MeetingStatus_meetingItemId_fkey" FOREIGN KEY ("meetingItemId") REFERENCES "MeetingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_carriedForwardTo" ADD CONSTRAINT "_carriedForwardTo_A_fkey" FOREIGN KEY ("A") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_carriedForwardTo" ADD CONSTRAINT "_carriedForwardTo_B_fkey" FOREIGN KEY ("B") REFERENCES "MeetingItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
