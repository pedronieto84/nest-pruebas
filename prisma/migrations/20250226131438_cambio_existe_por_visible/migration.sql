/*
  Warnings:

  - You are about to drop the column `existe` on the `Records` table. All the data in the column will be lost.
  - Added the required column `position` to the `Records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visible` to the `Records` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecordPosition" AS ENUM ('START', 'END', 'MIDDLE');

-- AlterTable
ALTER TABLE "Records" DROP COLUMN "existe",
ADD COLUMN     "position" "RecordPosition" NOT NULL,
ADD COLUMN     "visible" BOOLEAN NOT NULL;
