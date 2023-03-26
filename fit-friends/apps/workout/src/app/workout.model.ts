import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'workout',
  timestamps: true,
  versionKey: false
})
export class WorkoutModel extends Document {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  trainLevel: string;

  @Prop()
  typeTraining: string;

  @Prop()
  timeTraining: number;

  @Prop()
  price: number;

  @Prop()
  calories: number;

  @Prop()
  description: string;

  @Prop()
  gender: string;

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