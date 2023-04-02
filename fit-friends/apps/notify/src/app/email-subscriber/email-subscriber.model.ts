import { Subscriber } from "@fit-friends/shared-types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  collection: 'subscribers',
  timestamps: true,
  versionKey: false
})
export class SubscriberModel extends Document implements Subscriber {
  @Prop()
  user: string;
  @Prop()
  date: Date;
  
  @Prop()
  email: string;

  @Prop()
  username: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);