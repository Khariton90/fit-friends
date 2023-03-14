import { Gender } from './gender.enum';
import { TypeTraining } from './type-training.enum';
import { TrainLevel } from './train-level.enum';

export interface Workout {
 _id?: string;
 title: string;
 image: string;
 trainLevel: TrainLevel;
 typeTraining: TypeTraining;
 timeTraining: number;
 price: number;
 calories: number;
 description: string;
 gender: Gender;
 movie: string;
 rating: number;
 coach: string;
 specialOffer: boolean;
}