import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateRealGameDto {
  @ApiProperty()
  @IsNumber()
  homeScore: number;

  @ApiProperty()
  @IsNumber()
  awayScore: number;
}
