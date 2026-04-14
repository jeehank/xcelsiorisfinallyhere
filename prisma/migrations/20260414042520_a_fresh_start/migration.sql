/*
  Warnings:

  - You are about to drop the column `userId` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the `_EventToParticipant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolName` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_userId_fkey";

-- DropForeignKey
ALTER TABLE "_EventToParticipant" DROP CONSTRAINT "_EventToParticipant_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToParticipant" DROP CONSTRAINT "_EventToParticipant_B_fkey";

-- DropIndex
DROP INDEX "Participant_number_key";

-- DropIndex
DROP INDEX "Participant_userId_idx";

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "userId",
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "schoolName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "slugs" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "_EventToParticipant";

-- CreateIndex
CREATE INDEX "Participant_eventName_idx" ON "Participant"("eventName");

-- CreateIndex
CREATE INDEX "Participant_number_idx" ON "Participant"("number");

-- CreateIndex
CREATE INDEX "Participant_schoolName_idx" ON "Participant"("schoolName");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_eventName_fkey" FOREIGN KEY ("eventName") REFERENCES "Event"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_schoolName_fkey" FOREIGN KEY ("schoolName") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
