import { PersonalTrainingStatus } from "@fit-friends/shared-types";
import { Expose, Transform } from "class-transformer";

export class PersonalTrainingRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  id: string;

  @Expose()
  initiator: string;

  @Expose()
  user: string;

  @Expose()
  createdAt: Date;

  @Expose()
  status: PersonalTrainingStatus

  @Expose({name: 'updatedAt'})
  changeStatus: Date;
}