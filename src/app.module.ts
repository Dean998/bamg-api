import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersController } from './players/players.controller';
import { RealGamesController } from './real-games/real-games.controller';
import { RealGamePlayersController } from './real-games/modules/real-game-players/real-game-players.controller';
import { TeamsController } from './teams/teams.controller';
import { PlayersService } from './players/players.service';
import { PlayersModule } from './players/players.module';
import { PrismaService } from './prisma.service';
import { RealGamePlayersService } from './real-games/modules/real-game-players/real-game-players.service';
import { RealGamesService } from './real-games/real-games.service';
import { TeamsService } from './teams/teams.service';

@Module({
  imports: [PlayersModule],
  controllers: [
    AppController,
    PlayersController,
    RealGamesController,
    RealGamePlayersController,
    TeamsController,
  ],
  providers: [
    AppService,
    PlayersService,
    PrismaService,
    RealGamePlayersService,
    RealGamesService,
    TeamsService,
  ],
})
export class AppModule {}
