import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'First name of the player' })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Last name of the player' })
  lastName: string;
}
