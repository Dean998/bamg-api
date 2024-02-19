import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { RealGamePlayersController } from './real-game-players.controller';
import { RealGamePlayersService } from './real-game-players.service';
import { PlayersModule } from 'src/players/players.module';

@Module({
  controllers: [RealGamePlayersController],
  providers: [PrismaService, RealGamePlayersService],
  imports: [PlayersModule],
  exports: [RealGamePlayersService],
})
export class RealGamePlayersModule {}
