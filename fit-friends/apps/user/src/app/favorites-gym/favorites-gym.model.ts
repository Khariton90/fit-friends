import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { FavoritesGym } from '@fit-friends/shared-types';
 
@Schema({
  collection: 'favorites-gym',
  timestamps: false,
  versionKey: false
})
export class FavoritesGymModel extends Document implements FavoritesGym {
  @Prop({
    required: true,
    type: String
  })
  user: string;

  @Prop({
    required: true,
  })
  favorite: string[];
}

export const FavoritesGymSchema = SchemaFactory.createForClass(FavoritesGymModel);