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
  @ApiProperty()
  @IsNumber()
  realGameId: number;

  @ApiProperty()
  @IsString()
  realGameOptaId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  optaPosition?: string;

  @ApiProperty()
  @IsString()
  playerOptaId: string;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsString()
  positionOptaId: string;

  @ApiProperty()
  @IsJSON()
  playerStats: JsonValue;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  teamId?: number;

  @ApiProperty()
  @IsString()
  teamOptaId: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  playerId?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  playerPoints?: number;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  playerStatusUpdateAt?: Date;
}
