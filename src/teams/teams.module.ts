import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  controllers: [TeamsController],
  providers: [PrismaService, TeamsService],
  imports: [],
  exports: [TeamsService],
})
export class TeamsModule {}
