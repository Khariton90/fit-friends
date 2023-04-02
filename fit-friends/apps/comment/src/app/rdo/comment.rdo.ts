import { Expose, Transform } from "class-transformer";

export class CommentRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose()
  id: string;
  
  @Expose()
  workout: string;

  @Expose()
  rating: number;

  @Expose()
  review: string;

  @Expose()
  createdAt: Date
}