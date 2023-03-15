import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'user',
  timestamps: true,
  versionKey: false
})
export class UserModel extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  avatar: string;

  @Prop()
  passwordHash: string;

  @Prop()
  gender: string;

  @Prop()
  dateBirth: Date;

  @Prop()
  role: string;

  @Prop()
  location: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);