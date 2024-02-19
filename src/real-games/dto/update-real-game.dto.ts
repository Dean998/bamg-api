import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRealGameDto {
  @IsNumber()
  homeScore: number;

  @IsNumber()
  awayScore: number;
}
