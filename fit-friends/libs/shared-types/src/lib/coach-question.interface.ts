import { TrainLevel } from './train-level.enum';
import { TypeTraining } from './type-training.enum';

export interface CoachQuestion {
  trainLevel: TrainLevel,
  typesTraining: TypeTraining[],
  sertificates: string,
  merits: string,
  personalTraining: boolean, 
}