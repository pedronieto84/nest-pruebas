-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deptId" TEXT;

-- CreateTable
CREATE TABLE "Project" (
    "projId" VARCHAR(30) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "compId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projId")
);

-- CreateTable
CREATE TABLE "Department" (
    "deptId" VARCHAR(30) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "compId" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("deptId")
);

-- CreateTable
CREATE TABLE "_UserProjects" (
    "A" VARCHAR(30) NOT NULL,
    "B" VARCHAR(30) NOT NULL,

    CONSTRAINT "_UserProjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_projId_key" ON "Project"("projId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_deptId_key" ON "Department"("deptId");

-- CreateIndex
CREATE INDEX "_UserProjects_B_index" ON "_UserProjects"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "Department"("deptId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Company"("compId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Company"("compId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProjects" ADD CONSTRAINT "_UserProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("projId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProjects" ADD CONSTRAINT "_UserProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
