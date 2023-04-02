import { Gender, TrainLevel, TypeTraining } from "@fit-friends/shared-types";
import { Expose, Transform } from "class-transformer";

export class WorkoutRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  image: string;

  @Expose()
  trainLevel: TrainLevel;

  @Expose()
  typeTraining: TypeTraining;

  @Expose()
  timeTraining: number;

  @Expose()
  price: number;

  @Expose()
  calories: number;

  @Expose()
  description: string;

  @Expose()
  gender: Gender;

  @Expose()
  movie: string;

  @Expose()
  rating: number;

  @Expose()
  coach: string;

  @Expose()
  specialOffer: boolean;
}