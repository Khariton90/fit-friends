import { Gender, TrainLevel, TypeTraining } from "@fit-friends/shared-types";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";


export class WorkoutRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    example: "6428a0dc06396d71e8f37ee2"
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    example: "The best hard workout"
  })
  title: string;

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    example: "http://localhost:3339/api/image/training-1.jpg"
  })
  image: string;

  @Expose()
  @ApiProperty({
    type: String,
    enum: TrainLevel,
    required: true,
    example: "newbie"
  })
  trainLevel: TrainLevel;

  @Expose()
  @ApiProperty({
    type: String,
    enum: TypeTraining,
    required: true,
    example: "yoga"
  })
  typeTraining: TypeTraining;

  @Expose()
  @ApiProperty({
    type: Number,
    required: true,
    example: 30
  })
  timeTraining: number;

  @Expose()
  @ApiProperty({
    type: Number,
    required: true,
    example: 1000
  })
  price: number;

  @Expose()
  @ApiProperty({
    type: Number,
    required: true,
    example: 500
  })
  calories: number;

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    example: "No pain no gain"
  })
  description: string;

  @Expose()
  @ApiProperty({
    type: String,
    enum: Gender,
    required: true,
    example: "male"
  })
  gender: Gender;

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    example: "http://localhost:3339/api/workout/movies/workout-2023-03-27T00-34-33.avi"
  })
  movie: string;

  @Expose()
  @ApiProperty({
    type: Number,
    required: true,
    example: 4
  })
  rating: number;

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    example: "6428a0dc06396d71e8f37ee2"
  })
  coach: string;

  @Expose()
  @ApiProperty({
    type: Boolean,
    required: true,
    example: false
  })
  specialOffer: boolean;
}