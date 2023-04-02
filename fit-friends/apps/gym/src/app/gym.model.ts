import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Gym, GymParameters, Location } from "@fit-friends/shared-types";

@Schema({
  collection: 'gym',
  timestamps: true,
  versionKey: false
})
export class GymModel extends Document implements Gym {
  @Prop()
  title: string;

  @Prop({
    type: String,
    enum: Location
  })
  location: Location;

  @Prop()
  verify: boolean;

  @Prop({
    type: Array,
    enum: GymParameters
  })
  parameters: GymParameters[];

  @Prop()
  photos: string[];

  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const GymSchema = SchemaFactory.createForClass(GymModel);