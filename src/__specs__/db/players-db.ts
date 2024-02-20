import { Player, RealGame, Team } from '@prisma/client';
import prisma from './setup';

export const testPlayer = {
  playerOptaId: 'Should stay the same',
  firstName: 'Hi',
  lastName: 'Doe',
  position: 'Midfielder',
  optaPosition: 'MID',
  teamOptaId: 'hello',
  attack: 7.5,
  defense: 6.2,
  strength: 8.1,
  impact: 7,
  skills: 7.8,
  scoring: 6.5,
};

export const testRealGame = {
  realGameOptaId: 'uniqueOptaId123',
  awayScore: 2,
  homeScore: 3,
  homeTeamName: 'FC Home',
  homeTeamOptaId: 'homeOptaId123',
  compName: 'Premier League',
  datetime: new Date('2024-02-20T19:00:00Z'),
  date: '2024-02-20',
  winnerTeamOptaId: 'homeOptaId123',
  seasonOptaId: 'seasonOptaId2024',
  status: 'Scheduled',
  round: 5,
  roundType: 'Group Stage',
  championshipSeasonId: 2024,
};

export const testRealGamePlayer = {
  realGameId: 1,
  realGameOptaId: 'uniqueOptaId123',
  name: 'John Doe',
  optaPosition: 'Forward',
  playerOptaId: 'Should stay the same',
  position: 'Striker',
  positionOptaId: 'positionOptaId123',
  playerStats: {},
  teamId: 10,
  teamOptaId: 'teamOptaId123',
  playerId: 5,
  playerPoints: 15.2,
};

export const getPlayer = async (id: number) =>
  prisma.player.findUnique({ where: { id } });
export const getPlayers = async () => prisma.player.findMany();

export const createPlayer = async () =>
  prisma.player.create({
    data: {
      ...testPlayer,
    },
  });

export const getRealGame = async (id: number) =>
  prisma.realGame.findUnique({ where: { id } });

export const getRealGames = async () => prisma.realGame.findMany();

export const createRealGame = async () =>
  prisma.realGame.create({
    data: {
      ...testRealGame,
    },
  });

export const getRealGamePlayer = async (realGame: RealGame, player: Player) =>
  prisma.realGamePlayer.findUnique({
    where: {
      realGameOptaId_playerOptaId: {
        realGameOptaId: realGame.realGameOptaId,
        playerOptaId: player.playerOptaId,
      },
    },
  });

export const getRealGamePlayers = async () => prisma.realGamePlayer.findMany();

export const createRealGamePlayer = async () =>
  prisma.realGamePlayer.create({
    data: {
      ...testRealGamePlayer,
    },
  });
