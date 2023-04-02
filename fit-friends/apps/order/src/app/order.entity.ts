import { Order, OrderType, PaymentMethod } from '@fit-friends/shared-types';

export class OrderEntity implements Order {
  public _id?: string;
  public purchase: OrderType;
  public service: string;
  public price: number;
  public quantity: number;
  public amountPrice: number;
  public paymentMethod: PaymentMethod;

  constructor(order: Order) {
    this.fillEntity(order)
  }

  public fillEntity(order: Order) {
    this.purchase = order.purchase;
    this.service = order.service;
    this.price = order.price;
    this.quantity = order.quantity;
    this.amountPrice = order.amountPrice;
    this.paymentMethod = order.paymentMethod;
  }

  public toObject() {
    return {...this};
  }
}