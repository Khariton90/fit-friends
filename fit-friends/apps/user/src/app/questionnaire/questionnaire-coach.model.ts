import { CoachQuestion, TrainLevel, TypeTraining } from '@fit-friends/shared-types';
import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'questionnaire-coach',
  timestamps: true,
  versionKey: false
})
export class QuestionnaireCoachModel extends Document implements CoachQuestion {
  @Prop({
    required: true
  })
  userId: string;

  @Prop({
      type: String,
      enum: TrainLevel
  })
  trainLevel: TrainLevel;

  @Prop({
    type: Array,
    enum: TypeTraining
  })
  typesTraining: TypeTraining[];

  @Prop()
  sertificates: string;

  @Prop()
  merits: string;

  @Prop()
  personalTraining: boolean;
}

export const QuestionnaireCoachModelSchema = SchemaFactory.createForClass(QuestionnaireCoachModel);