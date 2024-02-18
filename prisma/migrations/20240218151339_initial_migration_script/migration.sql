-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "playerOptaId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "position" VARCHAR(255) NOT NULL,
    "optaPosition" TEXT NOT NULL,
    "teamId" INTEGER,
    "teamOptaId" TEXT NOT NULL,
    "attack" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "defense" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "strength" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "impact" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "skills" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "scoring" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealGame" (
    "id" SERIAL NOT NULL,
    "realGameOptaId" TEXT NOT NULL,
    "awayScore" INTEGER NOT NULL DEFAULT 0,
    "awayTeamName" TEXT,
    "awayTeamOptaId" TEXT,
    "awayTeamId" INTEGER,
    "homeScore" INTEGER NOT NULL DEFAULT 0,
    "homeTeamId" INTEGER,
    "homeTeamName" TEXT NOT NULL,
    "homeTeamOptaId" TEXT NOT NULL,
    "compName" TEXT NOT NULL,
    "datetime" TIMESTAMP(3),
    "date" TEXT,
    "winnerTeamOptaId" TEXT,
    "seasonOptaId" TEXT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "round" INTEGER NOT NULL DEFAULT 0,
    "roundType" VARCHAR(255) NOT NULL DEFAULT 'UNKNOWN',
    "championshipSeasonId" INTEGER NOT NULL,

    CONSTRAINT "RealGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealGamePlayer" (
    "realGameId" INTEGER NOT NULL,
    "realGameOptaId" TEXT NOT NULL,
    "name" TEXT,
    "optaPosition" TEXT,
    "playerOptaId" TEXT NOT NULL,
    "position" VARCHAR(255) NOT NULL,
    "positionOptaId" TEXT NOT NULL,
    "playerStats" JSONB NOT NULL,
    "teamId" INTEGER,
    "teamOptaId" TEXT NOT NULL,
    "playerId" INTEGER,
    "playerPoints" DOUBLE PRECISION,
    "playerStatusUpdateAt" TIMESTAMP(3),

    CONSTRAINT "RealGamePlayer_pkey" PRIMARY KEY ("realGameOptaId","playerOptaId")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamOptaId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coachOptaId" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerOptaId_key" ON "Player"("playerOptaId");

-- CreateIndex
CREATE UNIQUE INDEX "RealGame_realGameOptaId_key" ON "RealGame"("realGameOptaId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamOptaId_key" ON "Team"("teamOptaId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealGame" ADD CONSTRAINT "RealGame_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealGame" ADD CONSTRAINT "RealGame_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealGamePlayer" ADD CONSTRAINT "RealGamePlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealGamePlayer" ADD CONSTRAINT "RealGamePlayer_realGameId_fkey" FOREIGN KEY ("realGameId") REFERENCES "RealGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
