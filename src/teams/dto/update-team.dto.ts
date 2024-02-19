import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Name of the team' })
  name?: string;

  @ApiProperty({
    example: '67890',
    description: 'Opta ID for coach',
    required: false,
  })
  @IsOptional()
  @IsString()
  coachOptaId?: string;
}
