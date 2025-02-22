/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'OWNER');

-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('BOSS', 'WORKER');

-- CreateEnum
CREATE TYPE "Relation" AS ENUM ('VIEW', 'EDIT');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "settings" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" VARCHAR(50) NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Departmen_Manager" (
    "deptId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Departmen_Manager_pkey" PRIMARY KEY ("deptId","userId")
);

-- CreateTable
CREATE TABLE "User_Projects" (
    "userId" TEXT NOT NULL,
    "projId" TEXT NOT NULL,
    "role" "ProjectRole" NOT NULL,

    CONSTRAINT "User_Projects_pkey" PRIMARY KEY ("userId","projId")
);

-- CreateTable
CREATE TABLE "User_Relations" (
    "bossId" TEXT NOT NULL,
    "subordinatedId" TEXT NOT NULL,
    "relation" "Relation" NOT NULL,

    CONSTRAINT "User_Relations_pkey" PRIMARY KEY ("bossId","subordinatedId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Departmen_Manager" ADD CONSTRAINT "Departmen_Manager_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "Department"("deptId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departmen_Manager" ADD CONSTRAINT "Departmen_Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Projects" ADD CONSTRAINT "User_Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Projects" ADD CONSTRAINT "User_Projects_projId_fkey" FOREIGN KEY ("projId") REFERENCES "Project"("projId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Relations" ADD CONSTRAINT "User_Relations_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Relations" ADD CONSTRAINT "User_Relations_subordinatedId_fkey" FOREIGN KEY ("subordinatedId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
