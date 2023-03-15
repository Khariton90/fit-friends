import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'personal-training',
  timestamps: true,
  versionKey: false
})
export class PersonalTrainingModel extends Document {
  @Prop()
  initiator: string;

  @Prop()
  user: string;

  @Prop()
  changeStatus: Date;

  @Prop()
  status: string;
}

export const PersonalTrainingSchema = SchemaFactory.createForClass(PersonalTrainingModel);