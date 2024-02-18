import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  controllers: [PlayersController],
  providers: [PrismaService, PlayersService],
  imports: [],
  exports: [PlayersService],
})
export class PlayersModule {}
