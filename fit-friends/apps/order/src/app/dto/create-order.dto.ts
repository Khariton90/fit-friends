import { OrderType, PaymentMethod } from "@fit-friends/shared-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Type of purchase',
    example: 'training',
    required: true
  })
  @IsEnum(OrderType)
  public purchase: OrderType;

  @ApiProperty({
    description: 'ID training or subscription to the gym',
    example: '642858ae021f7d1433c22c76',
    required: true
  })
  @IsString()
  public service: string;

  @ApiProperty({
    description: 'Price',
    example: 1000,
    required: true
  })
  @IsInt()
  public price: number;

  @ApiProperty({
    description: 'The number of purchases',
    example: 2,
    required: true
  })
  @IsInt()
  @Min(1)
  @Max(50)
  public quantity: number;

  @ApiProperty({
    description: 'Type of payment',
    example: 'visa'
  })
  @IsEnum(PaymentMethod)
  public paymentMethod: PaymentMethod;
}