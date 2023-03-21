import { Gender, UserRole } from "@fit-friends/shared-types";
import { Expose, Transform } from "class-transformer";

export class ResponseUserDto {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
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
  location: string;
}