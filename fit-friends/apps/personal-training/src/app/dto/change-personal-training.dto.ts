import { IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { PersonalTrainingStatus } from "@fit-friends/shared-types";
import { ApiProperty } from '@nestjs/swagger';

export class ChangePersonalTrainingDto {
  @ApiProperty({
    description: 'The current application status',
    required: true,
    example: 'accepted'
  })
  @Expose()
  @IsEnum(PersonalTrainingStatus)
  status: PersonalTrainingStatus;
}