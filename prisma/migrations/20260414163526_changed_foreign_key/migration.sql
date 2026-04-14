-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_eventName_fkey";

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_eventName_fkey" FOREIGN KEY ("eventName") REFERENCES "Event"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
