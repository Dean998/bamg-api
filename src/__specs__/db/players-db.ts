import { Player } from '@prisma/client';
import prisma from './setup';

export const getPlayer = async (id: number) =>
  prisma.player.findUnique({ where: { id } });
export const getPlayers = async () => prisma.player.findMany();

export const createPlayer = async (player: Partial<Player> = {}) =>
  prisma.player.create({
    data: {
      firstName: jest.mock.name,
      lastName: jest.mock.name,
      displayName: jest.mock.name,
      ...player,
    },
  });
