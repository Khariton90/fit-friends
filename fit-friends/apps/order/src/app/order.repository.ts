import { CRUDRepository } from "@fit-friends/core";
import { OrderEntity } from "./order.entity";
import { Order } from "@fit-friends/shared-types";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { OrderModel } from "./order.model";
import { Model } from "mongoose";
import { OrderQuery } from "./query/order.query";

const DEFAULT_LIMIT_ORDERS = 50;

@Injectable()
export class OrderRepository implements CRUDRepository<OrderEntity, string, Order> {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>,
  ) { }

  public async find(query: OrderQuery): Promise<Order[] | []> {
    const sortOptions = {
      price: query.price || 1,
      quantity: query.quantity || -1
    }

    const orders = this.orderModel
      .find()
      .sort([['amountPrice', sortOptions.price], ['quantity', sortOptions.quantity]])
      .limit(DEFAULT_LIMIT_ORDERS)
      .exec();

    return orders;
  }

  public async findById(id: string): Promise<Order | null> {
    const existOrder = this.orderModel.findById(id);
    return existOrder;
  }

  public async create(item: OrderEntity): Promise<Order> {
    const newOrder = new this.orderModel(item);
    return newOrder.save();
  }

  public async update(id: string, item: OrderEntity): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, item.toObject(), { new: true });
  }

  public async destroy(id: string): Promise<void> {
    this.orderModel.findByIdAndDelete(id);
  }

}