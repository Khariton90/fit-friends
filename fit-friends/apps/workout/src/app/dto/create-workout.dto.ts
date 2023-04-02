import { Calories, Description } from './../workout.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, IsBoolean, Length, IsNotEmpty, Min, Max } from 'class-validator';
import { Gender, TrainLevel, TypeTraining } from "@fit-friends/shared-types";
import { TitleWorkout } from '../workout.constant';

export class CreateWorkoutDto {
  @ApiProperty({
    description: 'Title workout',
    example: 'The best hard workout'
  })
  @IsString()
  @Length(TitleWorkout.Min, TitleWorkout.Max)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Workout train level',
    example: 'newbie | amateur | pro'
  })
  @IsEnum(TrainLevel)
  @IsNotEmpty()
  trainLevel: TrainLevel;

  @ApiProperty({
    description: 'Workout type training',
    example: 'yoga | running | boxing'
  })
  @IsEnum(TypeTraining)
  @IsNotEmpty()
  typeTraining: TypeTraining;

  @ApiProperty({
    description: 'Workout time training',
    example: 30
  })
  @IsNumber()
  @Min(10)
  @IsNotEmpty()
  timeTraining: number;

  @ApiProperty({
    description: 'Workout price',
    example: '100'
  })
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Workout calories',
    example: '100'
  })
  @Min(Calories.Min)
  @Max(Calories.Max)
  @IsNumber()
  @IsNotEmpty()
  calories: number;

  @ApiProperty({
    description: 'Workout description',
    example: 'No pain no gain'
  })
  @IsString()
  @IsNotEmpty()
  @Length(Description.Min, Description.Max)
  description: string;

  @ApiProperty({
    description: 'Workout gender',
    example: 'male | female | never'
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({
    description: 'Workout movie url',
    example: 'http://localhost:3339/api/workout/movies/workout-2023-03-27T00-34-33.avi'
  })
  @IsString()
  @IsNotEmpty()
  movie: string;

  @ApiProperty({
    description: 'Workout rating',
    example: '5'
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: 'Workout coach id',
    example: '343fds43424ds2434'
  })
  @IsNotEmpty()
  @IsString()
  coach: string;

  @ApiProperty({
    description: 'Workout special offer',
    example: 'true | false'
  })
  @IsNotEmpty()
  @IsBoolean()
  specialOffer: boolean;
}