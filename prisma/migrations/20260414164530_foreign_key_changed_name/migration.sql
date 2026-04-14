/*
  Warnings:

  - You are about to drop the column `eventName` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `slugEvent` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_eventName_fkey";

-- DropIndex
DROP INDEX "Participant_eventName_idx";

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "eventName",
ADD COLUMN     "slugEvent" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Participant_slugEvent_idx" ON "Participant"("slugEvent");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_slugEvent_fkey" FOREIGN KEY ("slugEvent") REFERENCES "Event"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
