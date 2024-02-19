import { Injectable, NotFoundException } from '@nestjs/common';
import { Team } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';
import { CreateTeamDto, CreatedTeamDto, UpdateTeamDto } from './dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async create(createTeam: CreateTeamDto): Promise<CreatedTeamDto> {
    return this.prisma.team.create({
      data: createTeam,
    });
  }

  async findAll(): Promise<CreatedTeamDto[]> {
    return this.prisma.team.findMany({});
  }

  async findOne(id: number): Promise<CreatedTeamDto> {
    const team = await this.prisma.team.findUnique({ where: { id } });
    if (!team) {
      throw new NotFoundException();
    }
    return team;
  }

  async update(id: number, updateTeam: UpdateTeamDto): Promise<CreatedTeamDto> {
    try {
      const updated = await this.prisma.team.update({
        data: updateTeam,
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

  async remove(id: number): Promise<CreatedTeamDto> {
    try {
      const team = await this.prisma.team.findUnique({
        where: { id },
      });
      if (!team) {
        throw new NotFoundException();
      }
      const deleted = await this.prisma.team.delete({ where: { id } });
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
