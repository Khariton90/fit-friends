import { Gender, TrainLevel, TypeTraining, Workout } from '@fit-friends/shared-types';

export class WorkoutEntity implements Workout {
  public _id?: string;
  public title: string;
  public image: string;
  public trainLevel: TrainLevel;
  public typeTraining: TypeTraining;
  public timeTraining: number;
  public price: number;
  public calories: number;
  public description: string;
  public gender: Gender;
  public movie: string;
  public rating: number;
  public coach: string;
  public specialOffer: boolean;

  constructor(workout: Workout) {
    this.fillEntity(workout);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(workout: Workout) {
    this._id = workout._id;
    this.title = workout.title;
    this.image = workout.image;
    this.trainLevel = workout.trainLevel;
    this.typeTraining = workout.typeTraining;
    this.timeTraining = workout.timeTraining;
    this.price = workout.price;
    this.calories = workout.calories;
    this.description = workout.description;
    this.gender = workout.gender;
    this.movie = workout.movie;
    this.rating = workout.rating;
    this.coach = workout.coach;
    this.specialOffer = workout.specialOffer;
  }
}