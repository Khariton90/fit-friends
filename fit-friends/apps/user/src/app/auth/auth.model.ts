import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'authentication',
  timestamps: true,
  versionKey: false
})
export class AuthModel extends Document {
  @Prop({
    required: true
  })
  userId: string;  
  
  @Prop({
    required: true
  })
  public refreshToken: string;
}

export const AuthModelSchema = SchemaFactory.createForClass(AuthModel);