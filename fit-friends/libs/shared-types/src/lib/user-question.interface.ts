import { TrainLevel } from './train-level.enum';
import { TypeTraining } from './type-training.enum';

export interface UserQuestion {
  trainLevel: TrainLevel,
  typesTraining: [],
  timeTraining: number,
  resetCalories: number,
  spendCaloriesPerDay: number,
  readTrainig: boolean,
}
