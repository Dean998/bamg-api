import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ example: '12345', description: 'Unique Opta ID for the team' })
  @IsString()
  teamOptaId: string;

  @ApiProperty({ example: 'Team Name', description: 'Name of the team' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '67890',
    description: 'Opta ID for coach',
    required: false,
  })
  @IsOptional()
  @IsString()
  coachOptaId?: string;
}
