import { TrainLevel } from './train-level.enum';
import { TypeTraining } from './type-training.enum';

export interface UserQuestion {
  trainLevel: TrainLevel,
  typesTraining: TypeTraining[],
  timeTraining: number,
  resetCalories: number,
  spendCaloriesPerDay: number,
  readTrainig: boolean,
}
