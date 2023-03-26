import { TypeTraining } from '@fit-friends/shared-types';
import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'questionnaire',
  timestamps: true,
  versionKey: false
})
export class QuestionnaireModel extends Document {
  @Prop({
    required: true
  })
  userId: string;

  @Prop()
  trainLevel: string;

  @Prop()
  typesTraining: TypeTraining[];

  @Prop()
  timeTraining: number;

  @Prop()
  resetCalories: number;

  @Prop()
  spendCaloriesPerDay: number;

  @Prop()
  readTrainig: boolean;
  
  @Prop()
  sertificates: string;

  @Prop()
  merits: string;

  @Prop()
  personalTraining: boolean;
}

export const QuestionnaireModelSchema = SchemaFactory.createForClass(QuestionnaireModel);