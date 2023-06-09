import { Exclude, Expose } from "class-transformer";

export class UserQuestionnareRdo {
  @Exclude()
  userId: string;

  @Expose()
  trainLevel: string;

  @Expose()
  typesTraining: [];

  @Expose()
  timeTraining: number;

  @Expose()
  resetCalories: number;

  @Expose()
  spendCaloriesPerDay: number;
  
  @Expose()
  readTrainig: boolean;
}