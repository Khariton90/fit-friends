import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { OrderRdo } from './rdo/order.rdo';
import { OrderQuery } from './query/order.query';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(dto);
    return fillObject(OrderRdo, newOrder);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll(@Query() query: OrderQuery) {
    const orderList = await this.orderService.findOrders(query);
    return fillObject(OrderRdo, orderList);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id', CheckMongoidValidationPipe) id: string) {
    const order = await this.orderService.findOne(id);
    return fillObject(OrderRdo, order);
  }
}
