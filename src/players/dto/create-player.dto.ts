import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @IsString()
  @ApiProperty({ description: 'Unique identifier for the player from Opta' })
  playerOptaId: string;

  @IsString()
  @ApiProperty({ description: 'First name of the player' })
  firstName: string;

  @IsString()
  @ApiProperty({ description: 'Last name of the player' })
  lastName: string;

  @IsString()
  @ApiProperty({ description: 'Position of the player' })
  position: string;

  @IsString()
  @ApiProperty({ description: 'Opta position of the player' })
  optaPosition: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Team ID', required: false })
  teamId?: number;

  @IsString()
  @ApiProperty({ description: 'Team Opta ID' })
  teamOptaId: string;

  @IsNumber()
  @ApiProperty({ description: 'Attack skill level' })
  attack: number;

  @IsNumber()
  @ApiProperty({ description: 'Defense skill level' })
  defense: number;

  @IsNumber()
  @ApiProperty({ description: 'Strength level' })
  strength: number;

  @IsNumber()
  @ApiProperty({ description: 'Impact level' })
  impact: number;

  @IsNumber()
  @ApiProperty({ description: 'Skills level' })
  skills: number;

  @IsNumber()
  @ApiProperty({ description: 'Scoring ability' })
  scoring: number;
}
