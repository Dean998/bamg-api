import {
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
  IsJSON,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';

export class CreateRealGamePlayerDto {
  @IsNumber()
  realGameId: number;

  @IsString()
  realGameOptaId: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  optaPosition?: string;

  @IsString()
  playerOptaId: string;

  @IsString()
  position: string;

  @IsString()
  positionOptaId: string;

  @IsJSON()
  playerStats: JsonValue;

  @IsOptional()
  @IsNumber()
  teamId?: number;

  @IsString()
  teamOptaId: string;

  @IsOptional()
  @IsNumber()
  playerId?: number;

  @IsOptional()
  @IsInt()
  playerPoints?: number;

  @IsOptional()
  @IsDate()
  playerStatusUpdateAt?: Date;
}
