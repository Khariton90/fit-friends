import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Minimum permissible rating 1, maximum 5',
    required: true
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'The text of the comment, minLength 100 - max 1024',
    required: true
  })
  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  review: string;
}