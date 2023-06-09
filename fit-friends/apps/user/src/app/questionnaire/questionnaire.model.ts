import { TrainLevel, TypeTraining, UserQuestion } from '@fit-friends/shared-types';
import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'questionnaire',
  timestamps: true,
  versionKey: false
})
export class QuestionnaireModel extends Document implements UserQuestion {
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
  timeTraining: number;

  @Prop()
  resetCalories: number;

  @Prop()
  spendCaloriesPerDay: number;

  @Prop()
  readTrainig: boolean;
}

export const QuestionnaireModelSchema = SchemaFactory.createForClass(QuestionnaireModel);