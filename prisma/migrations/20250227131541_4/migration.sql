/*
  Warnings:

  - You are about to drop the column `keyboard` on the `Records` table. All the data in the column will be lost.
  - You are about to drop the column `mouseClicks` on the `Records` table. All the data in the column will be lost.
  - You are about to drop the column `mouseMove` on the `Records` table. All the data in the column will be lost.
  - You are about to drop the column `seconds` on the `Records` table. All the data in the column will be lost.
  - Added the required column `type` to the `Records` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('DESKTOP', 'MOBILE');

-- AlterTable
ALTER TABLE "Records" DROP COLUMN "keyboard",
DROP COLUMN "mouseClicks",
DROP COLUMN "mouseMove",
DROP COLUMN "seconds",
ADD COLUMN     "type" "RecordType" NOT NULL;

-- CreateTable
CREATE TABLE "RecordsDesktop" (
    "recordId" INTEGER NOT NULL,
    "keyboard" INTEGER,
    "mouseMove" INTEGER,
    "mouseClicks" INTEGER,
    "seconds" INTEGER NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RecordsPrograms" (
    "recordProgrId" SERIAL NOT NULL,
    "recordId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "keyboard" INTEGER,
    "mouseMove" INTEGER,
    "mouseClicks" INTEGER,

    CONSTRAINT "RecordsPrograms_pkey" PRIMARY KEY ("recordProgrId")
);

-- CreateTable
CREATE TABLE "RecordsMobile" (
    "recordId" INTEGER NOT NULL,
    "geoPosition" TEXT NOT NULL,
    "video" TEXT,
    "foto" TEXT,

    CONSTRAINT "RecordsMobile_pkey" PRIMARY KEY ("recordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecordsDesktop_recordId_key" ON "RecordsDesktop"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordsPrograms_recordProgrId_key" ON "RecordsPrograms"("recordProgrId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordsMobile_recordId_key" ON "RecordsMobile"("recordId");

-- AddForeignKey
ALTER TABLE "RecordsDesktop" ADD CONSTRAINT "RecordsDesktop_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Records"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordsPrograms" ADD CONSTRAINT "RecordsPrograms_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordsDesktop"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordsMobile" ADD CONSTRAINT "RecordsMobile_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Records"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;
