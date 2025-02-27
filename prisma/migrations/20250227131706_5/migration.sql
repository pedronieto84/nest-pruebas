/*
  Warnings:

  - You are about to drop the column `seconds` on the `RecordsDesktop` table. All the data in the column will be lost.
  - Added the required column `seconds` to the `Records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Records" ADD COLUMN     "seconds" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RecordsDesktop" DROP COLUMN "seconds";
