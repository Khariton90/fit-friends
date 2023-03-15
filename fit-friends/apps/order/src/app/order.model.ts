import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'order',
  timestamps: true,
  versionKey: false
})
export class OrderModel extends Document {
  @Prop()
  purchase: string;

  @Prop()
  service: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
  amountPrice: number;

  @Prop()
  paymentMethod: string;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);