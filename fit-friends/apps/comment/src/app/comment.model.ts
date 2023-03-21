import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'comment',
  timestamps: true,
  versionKey: false
})
export class CommentModel extends Document {
  @Prop()
  public author: string;

  @Prop()
  public workout: string;

  @Prop()
  public rating: number;

  @Prop()
  public review: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);