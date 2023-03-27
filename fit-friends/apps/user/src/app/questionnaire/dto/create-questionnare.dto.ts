import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TrainLevel, TypeTraining } from '@fit-friends/shared-types';

export class createQuestionnareDto {
  @ApiProperty({
    description: 'Unique ID user',
    example:'64206f6018e913bbbd81cce2',
  })
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'The level of training',
    example: 'newbie | amateur | pro',
  })
  @IsNotEmpty()
  trainLevel: TrainLevel;

  @ApiProperty({
    description: 'Type of training from the list',
    example: 'yoga | boxing | running',
  })
  @IsNotEmpty()
  typesTraining: TypeTraining[];

  @ApiProperty({
    description: 'Training time for training',
    example: 30,
  })
  @IsNotEmpty()
  timeTraining: number;

  @ApiProperty({
    description: 'Number of calories for reset',
    example: 400,
  })
  @IsNotEmpty()
  resetCalories: number;

  @ApiProperty({
    description: 'Number of calories for reset per day',
    example: 2000,
  })
  @IsNotEmpty()
  spendCaloriesPerDay: number;

  @ApiProperty({
    description: 'Readiness for training',
    example: "true || false",
  })
  @IsNotEmpty()
  readTrainig: boolean;
}
