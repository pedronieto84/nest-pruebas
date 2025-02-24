/*
  Warnings:

  - You are about to drop the `Departmen_Manager` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Departmen_Manager" DROP CONSTRAINT "Departmen_Manager_deptId_fkey";

-- DropForeignKey
ALTER TABLE "Departmen_Manager" DROP CONSTRAINT "Departmen_Manager_userId_fkey";

-- DropTable
DROP TABLE "Departmen_Manager";

-- CreateTable
CREATE TABLE "Department_Manager" (
    "deptId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Department_Manager_pkey" PRIMARY KEY ("deptId","userId")
);

-- AddForeignKey
ALTER TABLE "Department_Manager" ADD CONSTRAINT "Department_Manager_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "Department"("deptId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department_Manager" ADD CONSTRAINT "Department_Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
