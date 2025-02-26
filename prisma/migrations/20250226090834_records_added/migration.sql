/*
  Warnings:

  - You are about to drop the column `mouse` on the `Records` table. All the data in the column will be lost.
  - Added the required column `existe` to the `Records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mouseMove` to the `Records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Records" DROP COLUMN "mouse",
ADD COLUMN     "existe" BOOLEAN NOT NULL,
ADD COLUMN     "mouseMove" INTEGER NOT NULL;
