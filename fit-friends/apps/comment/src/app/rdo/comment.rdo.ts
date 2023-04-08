import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class CommentRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Uniq comment ID',
    example: '6428a0dc06396d71e8f37ee2'
  })
  id: string;
  
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Uniq workout ID',
    example: '6868a0dc06396d71e8f37ex3'
  })
  workout: string;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Comment rating',
    example: 4
  })
  rating: number;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Commentary for training',
    example: 'Nice price, good workout'
  })
  review: string;

  @Expose()
  @ApiProperty({
    type: Date,
    description: 'The time of creating a comment',
    example: '2023-04-01T21:23:40.529Z'
  })
  createdAt: Date
}