import { OrderType, PaymentMethod } from "@fit-friends/shared-types";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class OrderRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  @ApiProperty({
    type: String,
    description: 'Uniq order ID',
    example: '6428a0dc06396d71e8f37ee2'
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: String,
    enum: OrderType,
    description: 'Type of order',
    example: 'subscription'
  })
  purchase: OrderType;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Order service',
    example: 'service'
  })
  service: string;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'The price of the order',
    example: 2000
  })
  price: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'The quantity price of the order',
    example: 3
  })
  quantity: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'the total amount of the order',
    example: 6000
  })
  amountPrice: number;

  @Expose()
  @ApiProperty({
    type: String,
    enum: PaymentMethod,
    description: 'Order payment method',
    example: "visa"
  })
  paymentMethod: PaymentMethod;
}