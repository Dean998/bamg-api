import { Injectable, NotFoundException } from '@nestjs/common';
import { Player, RealGamePlayer } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../../../prisma.service';
import {
  CreateRealGamePlayerDto,
  CreatedRealGamePlayerDto,
  UpdateRealGamePlayerDto,
} from './dto';

@Injectable()
export class RealGamePlayersService {
  constructor(private prisma: PrismaService) {}

  async create(
    createRealGamePlayer: CreateRealGamePlayerDto,
  ): Promise<CreatedRealGamePlayerDto> {
    const { playerId, realGameId } = createRealGamePlayer;

    const { realGameOptaId } = await this.prisma.realGame.findUnique({
      where: { id: realGameId },
    });
    const { playerOptaId } = await this.prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!realGameOptaId || !playerOptaId) {
      throw new NotFoundException('player or real game not found');
    }

    return this.prisma.realGamePlayer.create({
      data: createRealGamePlayer,
    });
  }

  async findAll(id: number): Promise<CreatedRealGamePlayerDto[]> {
    return this.prisma.realGamePlayer.findMany({ where: { realGameId: id } });
  }

  async findOne(
    realGameId: number,
    playerId: number,
  ): Promise<CreatedRealGamePlayerDto> {
    const { realGameOptaId } = await this.prisma.realGame.findUnique({
      where: { id: realGameId },
    });
    const { playerOptaId } = await this.prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!realGameOptaId || !playerOptaId) {
      throw new NotFoundException('player or real game not found');
    }

    const realGamePlayer = await this.prisma.realGamePlayer.findUnique({
      where: {
        realGameOptaId_playerOptaId: {
          realGameOptaId,
          playerOptaId,
        },
      },
    });
    if (!realGamePlayer) {
      throw new NotFoundException();
    }
    return realGamePlayer;
  }
  async update(
    realGameId: number,
    playerId: number,
    updateRealGamePlayer: UpdateRealGamePlayerDto,
  ): Promise<CreatedRealGamePlayerDto> {
    try {
      const { realGameOptaId } = await this.prisma.realGame.findUnique({
        where: { id: realGameId },
      });
      const { playerOptaId } = await this.prisma.player.findUnique({
        where: { id: playerId },
      });

      const updated = await this.prisma.realGamePlayer.update({
        data: updateRealGamePlayer,
        where: {
          realGameOptaId_playerOptaId: { realGameOptaId, playerOptaId },
        },
      });
      return updated;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException();
        }
      }
      throw err;
    }
  }

  async remove(
    realGameId: number,
    playerId: number,
  ): Promise<CreatedRealGamePlayerDto> {
    try {
      const realGame = await this.prisma.realGame.findUnique({
        where: { id: realGameId },
      });

      const player = await this.prisma.player.findUnique({
        where: { id: playerId },
      });

      const realGamePlayer = await this.prisma.realGamePlayer.findUnique({
        where: {
          realGameOptaId_playerOptaId: {
            realGameOptaId: realGame.realGameOptaId,
            playerOptaId: player.playerOptaId,
          },
        },
      });
      if (!realGamePlayer) {
        throw new NotFoundException();
      }
      const deleted = await this.prisma.realGamePlayer.delete({
        where: {
          realGameOptaId_playerOptaId: {
            realGameOptaId: realGame.realGameOptaId,
            playerOptaId: player.playerOptaId,
          },
        },
      });
      return deleted;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException();
        }
      }
      throw err;
    }
  }
}
