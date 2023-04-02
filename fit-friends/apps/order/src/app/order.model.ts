import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Order, OrderType, PaymentMethod } from "@fit-friends/shared-types";

@Schema({
  collection: 'order',
  timestamps: true,
  versionKey: false
})
export class OrderModel extends Document implements Order {
  @Prop({
    type: String,
    enum: OrderType
  })
  purchase: OrderType;

  @Prop()
  service: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
  amountPrice: number;

  @Prop({
    type: String,
    enum: PaymentMethod
  })
  paymentMethod: PaymentMethod;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);