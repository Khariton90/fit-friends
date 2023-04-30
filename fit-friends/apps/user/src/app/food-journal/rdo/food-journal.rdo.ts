import { Expose, Transform } from 'class-transformer';

export class FoodJournalRdo {
  @Expose({name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  id: string;
  
  @Expose()
  calories: number;
  
  @Expose()
  eating: string;

  @Expose()
  date: Date
}