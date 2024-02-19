import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateRealGamePlayerDto {
  @IsOptional()
  @IsInt()
  playerPoints?: number;

  @IsOptional()
  @IsDate()
  playerStatusUpdateAt?: Date;
}
