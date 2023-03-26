import { CoachQuestion, UserQuestion, Gender, UserRole } from "@fit-friends/shared-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsObject, IsString, Length } from 'class-validator';

const MIN_LENGTH_USERNAME = 1;
const MAX_LENGTH_USERNAME = 15;

export class DetailedUserDto {
  @ApiProperty({
    description: 'Username',
    required: true,
    example: 'FooBar'
  })
  @Length(MIN_LENGTH_USERNAME, MAX_LENGTH_USERNAME)
  username: string;

  @ApiProperty({
    description: 'Unique user email',
    required: true,
    example: '1@mail.ru'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Image Url',
    required: true,
    example: 'img.jpg'
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    description: 'user password',
    required: true,
    example: '1234567'
  })
  @Length(6, 12)
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User gender: male, female, never',
    required: true,
    example: 'male'
  })
  @IsString()
  gender: Gender;

  @ApiProperty({
    description: 'User date birth',
    required: true,
    example: '2023-03-21T17:33:28.305Z'
  })
  @IsString()
  dateBirth: Date;

  @ApiProperty({
    description: 'User role',
    required: true,
    example: 'coach & user'
  })
  @IsString()
  role: UserRole;

  @ApiProperty({
    description: 'User location',
    required: true,
    example: 'Пионерская'
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'User question',
    required: true,
    example: {
      "dsdasdsad":" dsadasdsadad"
    }
  })
  @IsObject()
  question: CoachQuestion | UserQuestion
}


