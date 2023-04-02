import { ApiProperty } from '@nestjs/swagger';
import { GymParameters, Location } from "@fit-friends/shared-types";
import { IsString, MaxLength, MinLength, IsEnum, IsBoolean, IsArray, ArrayMaxSize, IsInt, Min, Max } from 'class-validator';

export class CreateGymDto {
  @ApiProperty({
    description: 'The name of the gym',
    required: true
  })
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  title: string;

  @ApiProperty({
    description: 'Metro station.',
    required: true,
    enum: Location,
    type: String,
  })
  @IsEnum(Location)
  location: Location;

  @ApiProperty({
    description: 'A sign that the gym is checked',
    required: true
  })
  @IsBoolean()
  verify: boolean;

  @ApiProperty({
    description: 'Features of the gym',
    required: true,
    enum: GymParameters
  })
  @IsEnum(GymParameters, { each: true })
  parameters: GymParameters[];

  @ApiProperty({
    description: 'Photos of the location of the gym',
    required: true
  })
  @IsArray()
  @ArrayMaxSize(5)
  photos: string[];

  @ApiProperty({
    description: 'Description of the gym',
    required: true
  })
  @IsString()
  @MaxLength(140)
  description: string;

  @ApiProperty({
    description: 'The cost of one training',
    required: true
  })
  @IsInt()
  @Min(100)
  @Max(5000)
  price: number;
}