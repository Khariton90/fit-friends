import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: OrderRdo,
    description: 'A new order has been created'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @ApiOperation({summary: 'Creating a new order'})
  async create(@Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(dto);
    return fillObject(OrderRdo, newOrder);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OrderRdo],
    description: 'A list of orders has been received'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @ApiOperation({summary: 'Get a list of orders for an authorized user'})
  async findAll(@Query() query: OrderQuery) {
    const orderList = await this.orderService.findOrders(query);
    return fillObject(OrderRdo, orderList);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderRdo,
    description: 'Order has been received'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @ApiOperation({summary: 'Get order by ID'})
  async find(@Param('id', CheckMongoidValidationPipe) id: string) {
    const order = await this.orderService.findOne(id);
    return fillObject(OrderRdo, order);
  }
}
