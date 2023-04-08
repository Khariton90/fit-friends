import { Expose, Transform } from 'class-transformer';
import { Gender, UserRole, Location } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class FitUserRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Uniq user ID',
    example: '6428a0dc06396d71e8f37ee2'
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Username',
    example: 'John'
  })
  username: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'uniq user email',
    example: '1@mail.ru'
  })
  email: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'The path to the image',
    example: 'http://localhost:3337/api/avatar/{filename}'
  })
  avatar: string;

  @Expose()
  @ApiProperty({
    type: String,
    enum: Gender,
    description: 'The sexual belonging of the user',
    example: 'male'
  })
  gender: Gender;

  @Expose()
  @ApiProperty({
    type: Date,
    description: 'The date of birth of the user',
    example: '2023-04-01T21:23:40.529Z'
  })
  dateBirth: Date;

  @Expose()
  @ApiProperty({
    type: String,
    enum: UserRole,
    description: 'The role of the user in the application',
    example: 'user'
  })
  role: UserRole;

  @Expose()
  @ApiProperty({
    type: String,
    enum: Location,
    description: 'Metro station',
    example: 'Пионерская'
  })
  location: Location;

  @Expose()
  @ApiProperty({
    type: Date,
    description: 'User registration date',
    example: '2023-04-01T21:23:40.529Z'
  })
  createdAt: Date;
}