-- CreateTable
CREATE TABLE "User" (
    "userId" VARCHAR(30) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Company" (
    "compId" VARCHAR(30) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("compId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_compId_key" ON "Company"("compId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_compId_fkey" FOREIGN KEY ("compId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
