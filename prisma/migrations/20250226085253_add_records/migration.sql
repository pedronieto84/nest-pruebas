-- CreateTable
CREATE TABLE "Records" (
    "recordId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projId" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "keyboard" INTEGER NOT NULL,
    "mouse" INTEGER NOT NULL,
    "mouseClicks" INTEGER NOT NULL,
    "seconds" INTEGER NOT NULL,

    CONSTRAINT "Records_pkey" PRIMARY KEY ("recordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Records_recordId_key" ON "Records"("recordId");

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_projId_fkey" FOREIGN KEY ("projId") REFERENCES "Project"("projId") ON DELETE RESTRICT ON UPDATE CASCADE;
