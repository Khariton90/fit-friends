import { Expose, Type } from "class-transformer";
import { FitUserRdo } from "../../fit-user/rdo/fit-user.rdo";

export class FriendsRdo {
  @Expose()
  @Type(() => FitUserRdo)
  friends: FitUserRdo[]
}