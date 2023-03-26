import { Gender, UserRole, Location } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsISO8601, IsOptional } from 'class-validator';


export class UpdateFitUserDto {
  @ApiProperty({
    description: 'User username',
    example: 'John'
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'Url user avatar',
    example: 'http://localhost:3338/api/fit-user/avatar/user-2023-03-27T00-34-33.jpg'
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    description: 'User gender',
    example: 'male | female | never'
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsOptional()
  @IsISO8601()
  dateBirth?: Date;

  @ApiProperty({
    description: 'User location',
    example: 'Пионерская | Петроградская | Удельная | Звездная | Спортивная',
  })
  @IsOptional()
  @IsEnum(Location)
  location?: Location;
}