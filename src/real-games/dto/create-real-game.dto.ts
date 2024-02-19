import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateRealGameDto {
  @ApiProperty()
  @IsString()
  realGameOptaId: string;

  @ApiProperty()
  @IsNumber()
  awayScore: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  awayTeamName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  awayTeamOptaId?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  awayTeamId?: number;

  @ApiProperty()
  @IsNumber()
  homeScore: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  homeTeamId?: number;

  @ApiProperty()
  @IsString()
  homeTeamName: string;

  @ApiProperty()
  @IsString()
  homeTeamOptaId: string;

  @ApiProperty()
  @IsString()
  compName: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  datetime?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  date?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  winnerTeamOptaId?: string;

  @ApiProperty()
  @IsString()
  seasonOptaId: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsNumber()
  round: number;

  @ApiProperty()
  @IsString()
  roundType: string;

  @ApiProperty()
  @IsNumber()
  championshipSeasonId: number;
}
