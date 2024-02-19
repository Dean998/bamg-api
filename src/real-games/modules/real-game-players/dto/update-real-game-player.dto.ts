import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class UpdateRealGamePlayerDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  playerPoints?: number;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  playerStatusUpdateAt?: Date;
}
