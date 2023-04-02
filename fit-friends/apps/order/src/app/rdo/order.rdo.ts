import { OrderType, PaymentMethod } from "@fit-friends/shared-types";
import { Expose, Transform } from "class-transformer";

export class OrderRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  id: string;

  @Expose()
  purchase: OrderType;

  @Expose()
  service: string;

  @Expose()
  price: number;

  @Expose()
  quantity: number;

  @Expose()
  amountPrice: number;

  @Expose()
  paymentMethod: PaymentMethod;
}