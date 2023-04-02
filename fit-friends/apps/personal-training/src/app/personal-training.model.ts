import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { PersonalTrainingStatus } from "@fit-friends/shared-types";

@Schema({
  collection: 'personal-training',
  timestamps: true,
  versionKey: false
})
export class PersonalTrainingModel extends Document implements PersonalTrainingModel {
  @Prop()
  initiator: string;

  @Prop()
  user: string;

  @Prop()
  changeStatus: Date;

  @Prop({
    type: String,
    enum: PersonalTrainingStatus
  })
  status: PersonalTrainingStatus;
}

export const PersonalTrainingSchema = SchemaFactory.createForClass(PersonalTrainingModel);