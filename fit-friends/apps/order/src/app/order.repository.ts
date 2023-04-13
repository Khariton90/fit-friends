import { CRUDRepository, DEFAULT_QUERY_LIMIT } from "@fit-friends/core";
import { OrderEntity } from "./order.entity";
import { Order } from "@fit-friends/shared-types";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { OrderModel } from "./order.model";
import { Model } from "mongoose";
import { OrderQuery } from "./query/order.query";

@Injectable()
export class OrderRepository implements CRUDRepository<OrderEntity, string, Order> {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>,
  ) { }

  public async find(query: OrderQuery): Promise<Order[] | []> {
    const pageOptions = {
      price: query.price || 1,
      page: query.skip > 1 ? query.skip - 1 : 0,
      quantity: query.quantity || -1,
      query: query.limit ? query.limit : DEFAULT_QUERY_LIMIT
    }

    const orders = this.orderModel
      .find()
      .sort([['amountPrice', pageOptions.price], ['quantity', pageOptions.quantity]])
      .limit(pageOptions.query)
      .skip(pageOptions.page * pageOptions.query)
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