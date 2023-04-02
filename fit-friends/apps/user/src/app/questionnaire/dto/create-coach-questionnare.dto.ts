import { MeritCoachLineLength } from './../questionnaire.constant';
import { ApiProperty } from '@nestjs/swagger';
import { TrainLevel, TypeTraining } from '@fit-friends/shared-types';
import { IsArray, IsNotEmpty, Length, ArrayMaxSize } from 'class-validator';
import { TYPE_TRAINING_MAX_LENGTH } from '../questionnaire.constant';

export class CreateCoachQuestionnareDto {
  @ApiProperty({
    description: 'Unique ID user',
    example:'64206f6018e913bbbd81cce2',
    required: true
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The level of training',
    example: 'newbie | amateur | pro',
    required: true
  })
  @IsNotEmpty()
  trainLevel: TrainLevel;

  @ApiProperty({
    description: 'Type of training from the list',
    example: ['yoga', 'boxing', 'running'],
    required: true
  })
  @IsArray()
  @ArrayMaxSize(TYPE_TRAINING_MAX_LENGTH)
  @IsNotEmpty()
  typesTraining: TypeTraining[];

  @ApiProperty({
    description: 'Coach sertificates',
    example: 'http://localhost:3338/api/setificates/1.pdf',
    required: true
  })
  @IsNotEmpty()
  sertificates: string;

  @ApiProperty({
    description: 'Merit of the coach',
    example: 'Long work coach for 40 years',
    required: true
  })
  @IsNotEmpty()
  @Length(MeritCoachLineLength.Min, MeritCoachLineLength.Max)
  merits: string;

  @ApiProperty({
    description: 'Readiness for personal training',
    example: 'true | false',
    required: true
  })
  @IsNotEmpty()
  personalTraining: boolean;
}
