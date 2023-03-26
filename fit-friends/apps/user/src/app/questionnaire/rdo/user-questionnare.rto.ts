import { Expose } from "class-transformer";

export class ResponseUserQuestionnare {
  @Expose()
  trainLevel?: string;

  @Expose()
  typesTraining?: [];

  @Expose()
  timeTraining?: number;

  @Expose()
  resetCalories?: number;

  @Expose()
  spendCaloriesPerDay?: number;
  
  @Expose()
  readTrainig?: boolean;

  @Expose()
  sertificates?: string;

  @Expose()
  merits?: string;

  @Expose()
  personalTraining?: boolean;
}