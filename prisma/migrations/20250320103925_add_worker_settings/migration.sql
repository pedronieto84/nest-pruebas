/*
  Warnings:

  - You are about to alter the column `day` on the `Records` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(12)`.
  - You are about to alter the column `time` on the `Records` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(12)`.
  - You are about to alter the column `geoPosition` on the `RecordsMobile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `video` on the `RecordsMobile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `foto` on the `RecordsMobile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "Records" ALTER COLUMN "day" SET DATA TYPE VARCHAR(12),
ALTER COLUMN "time" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "RecordsMobile" ALTER COLUMN "geoPosition" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "video" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "foto" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "RecordsSystem" (
    "recordId" INTEGER NOT NULL,
    "cpuUsage" DOUBLE PRECISION,
    "ramUsage" DOUBLE PRECISION,
    "diskUsage" DOUBLE PRECISION,
    "netUsage" DOUBLE PRECISION,
    "processes" JSONB,

    CONSTRAINT "RecordsSystem_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "WorkerSettings" (
    "userId" INTEGER NOT NULL,
    "wakeUp" BOOLEAN DEFAULT false,
    "stopLockScreen" BOOLEAN DEFAULT true,
    "stopOnSuspend" BOOLEAN DEFAULT true,
    "stopOnLockScreen" BOOLEAN DEFAULT true,
    "hidden" BOOLEAN DEFAULT false,
    "processes" BOOLEAN DEFAULT true,
    "systemData" BOOLEAN DEFAULT true,
    "internetSpeed" BOOLEAN DEFAULT true,
    "alwaysAwake" BOOLEAN DEFAULT true,
    "conexion" BOOLEAN DEFAULT true,
    "shutdown" BOOLEAN DEFAULT true,
    "screenshotView" BOOLEAN DEFAULT true,
    "activityView" BOOLEAN DEFAULT true,
    "processesView" BOOLEAN DEFAULT true,
    "systemDataView" BOOLEAN DEFAULT true,
    "gpsView" BOOLEAN DEFAULT true,
    "callsView" BOOLEAN DEFAULT true,
    "stopOnInactive" BOOLEAN DEFAULT true,
    "screenshot" BOOLEAN DEFAULT true,
    "activity" BOOLEAN DEFAULT true,
    "calls" BOOLEAN DEFAULT true,
    "gps" BOOLEAN DEFAULT true,
    "recordsPhone" INTEGER DEFAULT 3,
    "gpsPrecision" INTEGER DEFAULT 2,
    "recWithoutMov" BOOLEAN DEFAULT true,
    "forceAwake" BOOLEAN DEFAULT true,
    "awakeEvery" INTEGER DEFAULT 15,
    "gpsTime" BOOLEAN DEFAULT true,
    "menuConexion" BOOLEAN DEFAULT true,
    "menuPanel" BOOLEAN DEFAULT true,
    "menuGraficos" BOOLEAN DEFAULT true,
    "menuHorarios" BOOLEAN DEFAULT true,
    "menuSemanal" BOOLEAN DEFAULT true,
    "menuEquipo" BOOLEAN DEFAULT true,
    "menuProyectos" BOOLEAN DEFAULT true,
    "menuOficina" BOOLEAN DEFAULT true,
    "menuInformes" BOOLEAN DEFAULT true,
    "menuPartner" BOOLEAN DEFAULT true,
    "resetComment" BOOLEAN DEFAULT true,

    CONSTRAINT "WorkerSettings_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecordsSystem_recordId_key" ON "RecordsSystem"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkerSettings_userId_key" ON "WorkerSettings"("userId");

-- AddForeignKey
ALTER TABLE "RecordsSystem" ADD CONSTRAINT "RecordsSystem_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Records"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerSettings" ADD CONSTRAINT "WorkerSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
