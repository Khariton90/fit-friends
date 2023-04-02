import { OrderType } from "./order-type.enum";
import { PaymentMethod } from "./payment-method.enum";

export interface Order {
  _id?: string;
  purchase: OrderType;
  service: string;
  price: number;
  quantity: number;
  amountPrice: number;
  paymentMethod: PaymentMethod;
}