import { Eating, FoodJournal } from "@fit-friends/shared-types";
import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({
  collection: 'food-journal',
  versionKey: false,
  timestamps: false
})
export class FoodJournalModel extends Document implements FoodJournal {
  @Prop({
    required: true
  })
  user: string;

  @Prop({
    required: true
  })
  calories: number;

  @Prop({
    required: true
  })
  date: Date;

  @Prop({
    required: true,
    enum: Eating,
    type: String
  })
  eating: Eating;
}

export const FoodJournalSchema = SchemaFactory.createForClass(FoodJournalModel);