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
import {
  CreateRealGamePlayerDto,
  CreatedRealGamePlayerDto,
  UpdateRealGamePlayerDto,
} from './dto';
import { RealGamePlayersService } from './real-game-players.service';

@Controller('real-games/:realGameId/players')
export class RealGamePlayersController {
  constructor(
    private readonly realGamePlayersService: RealGamePlayersService,
  ) {}

  @Post()
  create(
    @Body() createRealGamePlayer: CreateRealGamePlayerDto,
  ): Promise<CreatedRealGamePlayerDto> {
    return this.realGamePlayersService.create(createRealGamePlayer);
  }

  @Get(':id')
  findOne(
    @Param('realGameId', ParseIntPipe) realGameId: number,
    @Param('id', ParseIntPipe) playerId: number,
  ): Promise<CreatedRealGamePlayerDto> {
    return this.realGamePlayersService.findOne(realGameId, playerId);
  }

  @Get()
  findAll(
    @Param('realGameId', ParseIntPipe) realGameId: number,
  ): Promise<CreatedRealGamePlayerDto[]> {
    return this.realGamePlayersService.findAll(realGameId);
  }

  @Patch(':id')
  update(
    @Param('realGameId', ParseIntPipe) realGameId: number,
    @Param('id', ParseIntPipe) playerId: number,
    @Body() updateRealGamePlayer: UpdateRealGamePlayerDto,
  ) {
    return this.realGamePlayersService.update(
      realGameId,
      playerId,
      updateRealGamePlayer,
    );
  }

  @Delete(':id')
  remove(
    @Param('realGameId', ParseIntPipe) realGameId: number,
    @Param('id', ParseIntPipe) playerId: number,
  ): Promise<CreatedRealGamePlayerDto> {
    return this.realGamePlayersService.remove(realGameId, playerId);
  }
}
