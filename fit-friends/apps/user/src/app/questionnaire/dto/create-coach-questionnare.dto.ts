import { MeritCoachLineLength } from './../questionnaire.constant';
import { ApiProperty } from '@nestjs/swagger';
import { TrainLevel, TypeTraining } from '@fit-friends/shared-types';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';
import { TYPE_TRAINING_MAX_LENGTH } from '../questionnaire.constant';

export class CreateCoachQuestionnareDto {
  @ApiProperty({
    description: 'Unique ID user',
    example:'64206f6018e913bbbd81cce2',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The level of training',
    example: 'newbie | amateur | pro',
  })
  @IsNotEmpty()
  trainLevel: TrainLevel;

  @ApiProperty({
    description: 'Type of training from the list',
    example: ['yoga', 'boxing', 'running'],
  })
  @MaxLength(TYPE_TRAINING_MAX_LENGTH, {
    each: true
  })
  @IsNotEmpty()
  typesTraining: TypeTraining[];

  @ApiProperty({
    description: 'Coach sertificates',
    example: 'http://localhost:3338/api/setificates/1.pdf',
  })
  @IsNotEmpty()
  sertificates: string;

  @ApiProperty({
    description: 'Merit of the coach',
    example: 'Long work coach for 40 years',
  })
  @IsNotEmpty()
  @Length(MeritCoachLineLength.Min, MeritCoachLineLength.Max)
  merits: string;

  @ApiProperty({
    description: 'Readiness for personal training',
    example: 'true | false',
  })
  @IsNotEmpty()
  personalTraining: boolean;
}
