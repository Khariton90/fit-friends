import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Gender, User, UserRole, Location } from "@fit-friends/shared-types";

@Schema({
  collection: 'user',
  timestamps: true,
  versionKey: false
})
export class UserModel extends Document implements User {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop()
  avatar: string;

  @Prop({
    required: true,
  })
  passwordHash: string;

  @Prop({
    required: true,
    type: String, 
    enum: Gender
  })
  gender: Gender;

  @Prop()
  dateBirth: Date;

  @Prop({
    required: true,
    type: String, 
    enum: UserRole
  })
  role: UserRole;

  @Prop({
    required: true,
    type: String, 
    enum: Location
  })
  location: Location;

  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);