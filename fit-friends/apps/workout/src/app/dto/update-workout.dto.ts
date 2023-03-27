import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Gender, TrainLevel, TypeTraining } from "@fit-friends/shared-types";

export class UpdateWorkoutDto {
  @ApiProperty({
    description: 'Title workout',
    example: 'The best hard workout'
  })
  @IsOptional()
  @IsString()
  @Expose()
  title?: string;

  @ApiProperty({
    description: 'Url image workout',
    example: 'http://localhost:3339/api/workout/pictures/workout-2023-03-27T00-34-33.jpg'
  })
  @IsOptional()
  @IsString()
  @Expose()
  image?: string;

  @ApiProperty({
    description: 'Workout train level',
    example: 'newbie | amateur | pro'
  })
  @IsOptional()
  @IsEnum(TrainLevel)
  @Expose()
  trainLevel?: TrainLevel;

  @ApiProperty({
    description: 'Workout type training',
    example: 'yoga | running | boxing'
  })
  @IsOptional()
  @IsEnum(TypeTraining)
  @Expose()
  typeTraining?: TypeTraining;

  @ApiProperty({
    description: 'Workout time training',
    example: '30'
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  timeTraining?: number;

  @ApiProperty({
    description: 'Workout price',
    example: '100'
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  price?: number;

  @ApiProperty({
    description: 'Workout calories',
    example: '100'
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  calories?: number;

  @ApiProperty({
    description: 'Workout description',
    example: 'No pain no gain'
  })
  @IsOptional()
  @IsString()
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Workout gender',
    example: 'male | female | never'
  })
  @IsOptional()
  @IsEnum(Gender)
  @Expose()
  gender?: Gender;

  @ApiProperty({
    description: 'Workout movie url',
    example: 'http://localhost:3339/api/workout/movies/workout-2023-03-27T00-34-33.avi'
  })
  @IsOptional()
  @IsString()
  @Expose()
  movie?: string;

  @ApiProperty({
    description: 'Workout rating',
    example: '5'
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  rating?: number;

  @ApiProperty({
    description: 'Workout special offer',
    example: 'true | false'
  })
  @IsOptional()
  @IsBoolean()
  @Expose()
  specialOffer?: boolean;

  @IsOptional()
  @Exclude()
  coach?: string;
}