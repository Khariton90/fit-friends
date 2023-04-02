import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from "@fit-friends/shared-types";

@Schema({
  collection: 'comment',
  timestamps: true,
  versionKey: false
})
export class CommentModel extends Document implements Comment {
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