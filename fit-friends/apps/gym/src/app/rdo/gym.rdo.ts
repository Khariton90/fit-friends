import { GymParameters, Location } from '@fit-friends/shared-types';
import { Expose, Transform } from 'class-transformer';

export class GymRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  id:string;

  @Expose()
  title: string;

  @Expose()
  location: Location;

  @Expose()
  parameters: GymParameters[];

  @Expose()
  photos: string[];

  @Expose()
  description: string;

  @Expose()
  price: number;
}