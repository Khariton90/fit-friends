import { IsNotEmpty, IsEnum, IsInt, Min, Max, IsArray, ArrayMaxSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TrainLevel, TypeTraining } from '@fit-friends/shared-types';
import { ResetCalories, TYPE_TRAINING_MAX_LENGTH } from '../questionnaire.constant';

export class CreateQuestionnareDto {
  @ApiProperty({
    description: 'The level of training',
    example: 'newbie | amateur | pro',
    enum: TrainLevel
  })
  @IsNotEmpty()
  @IsEnum(TrainLevel)
  trainLevel: TrainLevel;

  @ApiProperty({
    description: 'Type of training from the list',
    example: ['yoga', 'boxing', 'unning'],
    enum: TypeTraining
  })
  @IsArray()
  @ArrayMaxSize(TYPE_TRAINING_MAX_LENGTH)
  @IsNotEmpty()
  typesTraining: TypeTraining[];

  @ApiProperty({
    description: 'Training time for training',
    example: 30,
  })
  @IsNotEmpty()
  @Min(10)
  timeTraining: number;

  @ApiProperty({
    description: 'Number of calories for reset',
    example: 1000,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(ResetCalories.Min)
  @Max(ResetCalories.Max)
  resetCalories: number;

  @ApiProperty({
    description: 'Number of calories for reset per day',
    example: 2000,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(ResetCalories.Min)
  @Max(ResetCalories.Max)
  spendCaloriesPerDay: number;

  @ApiProperty({
    description: 'Readiness for training',
    example: "true || false",
  })
  @IsNotEmpty()
  readTrainig: boolean;
}
