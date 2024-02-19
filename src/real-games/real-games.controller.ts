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
import { RealGamesService } from './real-games.service';
import { Player, RealGame } from '@prisma/client';
import {
  CreateRealGameDto,
  CreatedRealGameDto,
  UpdateRealGameDto,
} from './dto';

@Controller('real-games')
export class RealGamesController {
  constructor(private readonly realGamesService: RealGamesService) {}

  @Post()
  create(
    @Body() createRealGameDto: CreateRealGameDto,
  ): Promise<CreatedRealGameDto> {
    return this.realGamesService.create(createRealGameDto);
  }

  @Get()
  findAll(): Promise<CreatedRealGameDto[]> {
    return this.realGamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CreatedRealGameDto> {
    return this.realGamesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRealGame: UpdateRealGameDto,
  ): Promise<CreatedRealGameDto> {
    return this.realGamesService.update(id, updateRealGame);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<CreatedRealGameDto> {
    return this.realGamesService.remove(id);
  }
}
