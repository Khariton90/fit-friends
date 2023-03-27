import { ApiProperty } from '@nestjs/swagger';
import { TrainLevel, TypeTraining } from '@fit-friends/shared-types';
import { IsNotEmpty } from 'class-validator';

export class createCoachQuestionnareDto {
  @ApiProperty({
    description: 'Unique ID user',
    example:'64206f6018e913bbbd81cce2',
  })
  @IsNotEmpty()
  userId: string;

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
    description: 'Coach sertificates',
    example: 'http://localhost:3338/api/setificates/1.jpg',
  })
  @IsNotEmpty()
  sertificates: string;

  @ApiProperty({
    description: 'Merit of the coach',
    example: 'Long work coach for 40 years',
  })
  @IsNotEmpty()
  merits: string;

  @ApiProperty({
    description: 'Readiness for personal training',
    example: 'true | false',
  })
  @IsNotEmpty()
  personalTraining: boolean;
}
