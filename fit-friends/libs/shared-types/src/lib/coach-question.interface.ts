import { TrainLevel } from './train-level.enum';
import { TypeTraining } from './type-training.enum';

export interface CoachQuestion {
  trainLevel: TrainLevel,
  typesTrainig: TypeTraining[],
  sertificates: string,
  merits: string,
  personalTraining: boolean, 
}