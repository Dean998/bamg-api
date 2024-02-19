import { Injectable, NotFoundException } from '@nestjs/common';
import { RealGame } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';
import {
  CreateRealGameDto,
  CreatedRealGameDto,
  UpdateRealGameDto,
} from './dto';

@Injectable()
export class RealGamesService {
  constructor(private prisma: PrismaService) {}

  async create(createRealGame: CreateRealGameDto): Promise<CreatedRealGameDto> {
    return this.prisma.realGame.create({
      data: createRealGame,
    });
  }

  async findAll(): Promise<CreatedRealGameDto[]> {
    return this.prisma.realGame.findMany({});
  }

  async findOne(id: number): Promise<CreatedRealGameDto> {
    const realGame = await this.prisma.realGame.findUnique({
      where: { id },
      include: { RealGamePlayer: true },
    });
    if (!realGame) {
      throw new NotFoundException();
    }
    return realGame;
  }

  async update(
    id: number,
    updateRealGame: UpdateRealGameDto,
  ): Promise<CreatedRealGameDto> {
    try {
      const updated = await this.prisma.realGame.update({
        data: updateRealGame,
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

  async remove(id: number): Promise<CreatedRealGameDto> {
    try {
      const realGame = await this.prisma.realGame.findUnique({
        where: { id },
      });
      if (!realGame) {
        throw new NotFoundException();
      }
      const deleted = await this.prisma.realGame.delete({ where: { id } });
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
