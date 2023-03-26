import { TypeTraining } from '@fit-friends/shared-types';

export class createQuestionnareDto {
  userId: string;
  trainLevel?: string;
  typesTraining?: TypeTraining[];
  timeTraining?: number;
  resetCalories?: number;
  spendCaloriesPerDay?: number;
  readTrainig?: boolean;
  sertificates?: string;
  merits?: string;
  personalTraining?: boolean;
}