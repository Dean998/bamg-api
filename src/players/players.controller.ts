import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Player } from '@prisma/client';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { CreatedPlayerDto, UpdatePlayerDto } from './dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayer: CreatePlayerDto): Promise<CreatedPlayerDto> {
    return this.playersService.create(createPlayer);
  }

  @Get()
  findAll(): Promise<CreatedPlayerDto[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayer: UpdatePlayerDto,
  ) {
    return this.playersService.update(id, updatePlayer);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<CreatedPlayerDto> {
    return this.playersService.remove(id);
  }
}
