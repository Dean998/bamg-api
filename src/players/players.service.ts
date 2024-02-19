import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { CreatedPlayerDto, UpdatePlayerDto } from './dto';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayer: CreatePlayerDto): Promise<CreatedPlayerDto> {
    return this.prisma.player.create({
      data: createPlayer,
    });
  }

  async findAll(): Promise<CreatedPlayerDto[]> {
    return this.prisma.player.findMany({});
  }

  async findOne(id: number): Promise<CreatedPlayerDto> {
    const player = await this.prisma.player.findUnique({
      where: { id },
      include: { RealGamePlayer: true },
    });
    if (!player) {
      throw new NotFoundException();
    }
    return player;
  }

  async update(
    id: number,
    updatePlayer: UpdatePlayerDto,
  ): Promise<CreatedPlayerDto> {
    const { firstName, lastName } = updatePlayer;
    try {
      const updated = await this.prisma.player.update({
        data: { firstName, lastName },
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

  async remove(id: number): Promise<CreatedPlayerDto> {
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
