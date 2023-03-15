import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'notify',
  timestamps: true,
  versionKey: false
})
export class NotifyModel extends Document {
  @Prop()
  dateNotify: Date;

  @Prop()
  user: string;

  @Prop()
  text: string;
}

export const NotifySchema = SchemaFactory.createForClass(NotifyModel);