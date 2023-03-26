import { Expose, Transform } from 'class-transformer';
import { Gender, UserRole } from '@fit-friends/shared-types';

export class FitUserRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  avatar: string;

  @Expose()
  gender: Gender;

  @Expose()
  dateBirth: Date;

  @Expose()
  role: UserRole;

  @Expose()
  location: Location;

  @Expose()
  createdAt: Date;
}