/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `compId` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `deptId` column on the `Department` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Department_Manager` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `projId` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `userId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deptId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `compId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User_Projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User_Relations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_UserProjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[firebaseId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `compId` on the `Department` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `deptId` on the `Department_Manager` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Department_Manager` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `compId` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `firebaseId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `User_Projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `projId` on the `User_Projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bossId` on the `User_Relations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `subordinatedId` on the `User_Relations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_UserProjects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_UserProjects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_compId_fkey";

-- DropForeignKey
ALTER TABLE "Department_Manager" DROP CONSTRAINT "Department_Manager_deptId_fkey";

-- DropForeignKey
ALTER TABLE "Department_Manager" DROP CONSTRAINT "Department_Manager_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_compId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_compId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_deptId_fkey";

-- DropForeignKey
ALTER TABLE "User_Projects" DROP CONSTRAINT "User_Projects_projId_fkey";

-- DropForeignKey
ALTER TABLE "User_Projects" DROP CONSTRAINT "User_Projects_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_Relations" DROP CONSTRAINT "User_Relations_bossId_fkey";

-- DropForeignKey
ALTER TABLE "User_Relations" DROP CONSTRAINT "User_Relations_subordinatedId_fkey";

-- DropForeignKey
ALTER TABLE "_UserProjects" DROP CONSTRAINT "_UserProjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserProjects" DROP CONSTRAINT "_UserProjects_B_fkey";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
DROP COLUMN "compId",
ADD COLUMN     "compId" SERIAL NOT NULL,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("compId");

-- AlterTable
ALTER TABLE "Department" DROP CONSTRAINT "Department_pkey",
DROP COLUMN "deptId",
ADD COLUMN     "deptId" SERIAL NOT NULL,
DROP COLUMN "compId",
ADD COLUMN     "compId" INTEGER NOT NULL,
ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("deptId");

-- AlterTable
ALTER TABLE "Department_Manager" DROP CONSTRAINT "Department_Manager_pkey",
DROP COLUMN "deptId",
ADD COLUMN     "deptId" INTEGER NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Department_Manager_pkey" PRIMARY KEY ("deptId", "userId");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "projId",
ADD COLUMN     "projId" SERIAL NOT NULL,
DROP COLUMN "compId",
ADD COLUMN     "compId" INTEGER NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("projId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "firebaseId" VARCHAR(30) NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" SERIAL NOT NULL,
DROP COLUMN "deptId",
ADD COLUMN     "deptId" INTEGER,
DROP COLUMN "compId",
ADD COLUMN     "compId" INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "User_Projects" DROP CONSTRAINT "User_Projects_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "projId",
ADD COLUMN     "projId" INTEGER NOT NULL,
ADD CONSTRAINT "User_Projects_pkey" PRIMARY KEY ("userId", "projId");

-- AlterTable
ALTER TABLE "User_Relations" DROP CONSTRAINT "User_Relations_pkey",
DROP COLUMN "bossId",
ADD COLUMN     "bossId" INTEGER NOT NULL,
DROP COLUMN "subordinatedId",
ADD COLUMN     "subordinatedId" INTEGER NOT NULL,
ADD CONSTRAINT "User_Relations_pkey" PRIMARY KEY ("bossId", "subordinatedId");

-- AlterTable
ALTER TABLE "_UserProjects" DROP CONSTRAINT "_UserProjects_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_UserProjects_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "Company_compId_key" ON "Company"("compId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_deptId_key" ON "Department"("deptId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projId_key" ON "Project"("projId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseId_key" ON "User"("firebaseId");

-- CreateIndex
CREATE INDEX "_UserProjects_B_index" ON "_UserProjects"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Company"("compId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "Department"("deptId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Company"("compId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Company"("compId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department_Manager" ADD CONSTRAINT "Department_Manager_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "Department"("deptId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department_Manager" ADD CONSTRAINT "Department_Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Projects" ADD CONSTRAINT "User_Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Projects" ADD CONSTRAINT "User_Projects_projId_fkey" FOREIGN KEY ("projId") REFERENCES "Project"("projId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Relations" ADD CONSTRAINT "User_Relations_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Relations" ADD CONSTRAINT "User_Relations_subordinatedId_fkey" FOREIGN KEY ("subordinatedId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProjects" ADD CONSTRAINT "_UserProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("projId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProjects" ADD CONSTRAINT "_UserProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
