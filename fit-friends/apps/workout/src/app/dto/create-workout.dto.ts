import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, IsBoolean } from 'class-validator';
import { Gender, TrainLevel, TypeTraining } from "@fit-friends/shared-types";

export class CreateWorkoutDto {
  @ApiProperty({
    description: 'Title workout',
    example: 'The best hard workout'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Url image workout',
    example: 'http://localhost:3339/api/workout/pictures/workout-2023-03-27T00-34-33.jpg'
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Workout train level',
    example: 'newbie | amateur | pro'
  })
  @IsEnum(TrainLevel)
  trainLevel: TrainLevel;

  @ApiProperty({
    description: 'Workout type training',
    example: 'yoga | running | boxing'
  })
  @IsEnum(TypeTraining)
  typeTraining: TypeTraining;

  @ApiProperty({
    description: 'Workout time training',
    example: '30'
  })
  @IsNumber()
  timeTraining: number;

  @ApiProperty({
    description: 'Workout price',
    example: '100'
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Workout calories',
    example: '100'
  })
  @IsNumber()
  calories: number;

  @ApiProperty({
    description: 'Workout description',
    example: 'No pain no gain'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Workout gender',
    example: 'male | female | never'
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Workout movie url',
    example: 'http://localhost:3339/api/workout/movies/workout-2023-03-27T00-34-33.avi'
  })
  @IsString()
  movie: string;

  @ApiProperty({
    description: 'Workout rating',
    example: '5'
  })
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: 'Workout coach id',
    example: '343fds43424ds2434'
  })
  @IsString()
  coach: string;

  @ApiProperty({
    description: 'Workout special offer',
    example: 'true | false'
  })
  @IsBoolean()
  specialOffer: boolean;
}