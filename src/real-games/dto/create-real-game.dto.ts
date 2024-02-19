import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateRealGameDto {
  @IsString()
  realGameOptaId: string;

  @IsNumber()
  awayScore: number;

  @IsOptional()
  @IsString()
  awayTeamName?: string;

  @IsOptional()
  @IsString()
  awayTeamOptaId?: string;

  @IsOptional()
  @IsNumber()
  awayTeamId?: number;

  @IsNumber()
  homeScore: number;

  @IsOptional()
  @IsNumber()
  homeTeamId?: number;

  @IsString()
  homeTeamName: string;

  @IsString()
  homeTeamOptaId: string;

  @IsString()
  compName: string;

  @IsOptional()
  @IsDate()
  datetime?: Date;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  winnerTeamOptaId?: string;

  @IsString()
  seasonOptaId: string;

  @IsString()
  status: string;

  @IsNumber()
  round: number;

  @IsString()
  roundType: string;

  @IsNumber()
  championshipSeasonId: number;
}
