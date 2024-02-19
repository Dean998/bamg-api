import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from '@prisma/client';
import { CreateTeamDto, CreatedTeamDto, UpdateTeamDto } from './dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeam: CreateTeamDto): Promise<CreatedTeamDto> {
    return this.teamsService.create(createTeam);
  }

  @Get()
  findAll(): Promise<CreatedTeamDto[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CreatedTeamDto> {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeam: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, updateTeam);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<CreatedTeamDto> {
    return this.teamsService.remove(id);
  }
}
