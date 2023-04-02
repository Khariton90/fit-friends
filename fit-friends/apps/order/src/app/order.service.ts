import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './order.entity';
import { Order } from '@fit-friends/shared-types';
import { OrderQuery } from './query/order.query';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const entity = {
      ...dto,
      amountPrice: dto.price * dto.quantity
    }
    return await this.orderRepository.create(new OrderEntity(entity));
  }

  async findOrders(query: OrderQuery): Promise<Order[] | []> {
    return await this.orderRepository.find(query);
  }

  async findOne(id: string): Promise<Order | null> {
    const existOrder = await this.orderRepository.findById(id);
    
    if (!existOrder) {
      throw new NotFoundException('This order was not found')
    }
    return existOrder;
  }
}
