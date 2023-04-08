import { GymParameters, Location } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class GymRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  @ApiProperty({
    type: String,
    description: 'Uniq gym ID',
    example: '6428a0dc06396d71e8f37ee2'
  })
  id:string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'The name of the gym',
    example: 'Gold Gym'
  })
  title: string;

  @Expose()
  @ApiProperty({
    type: String,
    enum: Location,
    description: 'The metro station of the gym',
    example: 'Пионерская'
  })
  location: Location;

  @Expose()
  @ApiProperty({
    type: Array,
    enum: GymParameters,
    description: 'Convenience and services in the gym',
    example: ["swimmingPool", "freeParking"]
  })
  parameters: GymParameters[];

  @Expose()
  @ApiProperty({
    type: Array,
    description: 'Links to the photo of the gym',
    example: ["http://localhost:3334/api/upload/training-1.jpg"]
  })
  photos: string[];

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Description of the gym',
    example: 'Nice price, good gym'
  })
  description: string;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Price for a subscription to a gym',
    example: 5000
  })
  price: number;
}