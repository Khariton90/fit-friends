import { Gender, UserRole, Location } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsISO8601, IsNotEmpty } from 'class-validator';

export class CreateFitUserDto {
  @ApiProperty({
    description: 'User username',
    example: 'John'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Uniq user email',
    example: 'john@gmail.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Url user avatar',
    example: 'http://localhost:3338/api/fit-user/avatar/user-2023-03-27T00-34-33.jpg'
  })
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User gender',
    example: 'male | female | never'
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601()
  @IsNotEmpty()
  dateBirth: Date;

  @ApiProperty({
    description: 'User role',
    example: 'coach | user',
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({
    description: 'User location',
    example: 'Пионерская | Петроградская | Удельная | Звездная | Спортивная',
  })
  @IsEnum(Location)
  @IsNotEmpty()
  location: Location;
}