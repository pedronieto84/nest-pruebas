-- AlterTable
ALTER TABLE "RecordsDesktop" ALTER COLUMN "image" DROP NOT NULL,
ADD CONSTRAINT "RecordsDesktop_pkey" PRIMARY KEY ("recordId");
