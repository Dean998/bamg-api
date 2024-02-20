import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { RealGamesController } from './real-games.controller';
import { RealGamesService } from './real-games.service';

@Module({
  controllers: [RealGamesController],
  providers: [PrismaService, RealGamesService],
  imports: [],
  exports: [RealGamesService],
})
export class RealGamesModule {}
