import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Gender, TrainLevel, TypeTraining, Workout } from "@fit-friends/shared-types";

@Schema({
  collection: 'workout',
  timestamps: true,
  versionKey: false
})
export class WorkoutModel extends Document implements Workout {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop({
    type: String,
    enum: TrainLevel
  })
  trainLevel: TrainLevel;

  @Prop({
    type: String,
    enum: TypeTraining
  })
  typeTraining: TypeTraining;

  @Prop()
  timeTraining: number;

  @Prop()
  price: number;

  @Prop()
  calories: number;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: Gender
  })
  gender: Gender;

  @Prop()
  movie: string;

  @Prop()
  rating: number;

  @Prop()
  coach: string;

  @Prop()
  specialOffer: boolean;
}

export const WorkoutSchema = SchemaFactory.createForClass(WorkoutModel);