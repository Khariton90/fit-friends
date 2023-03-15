import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'gym',
  timestamps: true,
  versionKey: false
})
export class GymModel extends Document {
  @Prop()
  title: string;

  @Prop()
  location: string;

  @Prop()
  verify: boolean;

  @Prop()
  parameters: string[];

  @Prop()
  photos: string[];

  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const GymSchema = SchemaFactory.createForClass(GymModel);