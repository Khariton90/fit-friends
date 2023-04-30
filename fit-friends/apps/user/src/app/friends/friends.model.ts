import { Friends } from '@fit-friends/shared-types';
import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema({
  collection: 'friends',
  versionKey: false,
  timestamps: false
})
export class FriendsModel extends Document implements Friends {
  @Prop({
    required: true
  })
  user: string;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'user' 
  })
  friends: string[];
}

export const FriendsSchema = SchemaFactory.createForClass(FriendsModel);