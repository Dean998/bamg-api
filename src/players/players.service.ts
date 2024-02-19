import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayer: Player): Promise<Player> {
    return this.prisma.player.create({
      data: createPlayer,
    });
  }

  async findAll(): Promise<Player[]> {
    return this.prisma.player.findMany({});
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.prisma.player.findUnique({
      where: { id },
      include: { RealGamePlayer: true },
    });
    if (!player) {
      throw new NotFoundException();
    }
    return player;
  }

  async update(id: number, updatePlayer: Player): Promise<Player> {
    try {
      const updated = await this.prisma.player.update({
        data: updatePlayer,
        where: { id },
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

  async remove(id: number): Promise<Player> {
    try {
      const player = await this.prisma.player.findUnique({
        where: { id },
      });
      if (!player) {
        throw new NotFoundException();
      }
      const deleted = await this.prisma.player.delete({ where: { id } });
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
