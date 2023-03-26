import { Expose } from 'class-transformer';
import { PersonalTrainingStatus } from "@fit-friends/shared-types";

export class ChangePersonalTrainingDto {
  @Expose()
  initiator: string;

  @Expose()
  user: string;

  @Expose()
  changeStatus: Date;

  @Expose()
  status: PersonalTrainingStatus;
}