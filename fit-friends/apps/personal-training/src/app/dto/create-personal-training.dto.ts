import { PersonalTrainingStatus } from "@fit-friends/shared-types";

export class CreatePersonalTrainingDto {
  initiator: string;
  user: string;
  changeStatus: Date;
  status: PersonalTrainingStatus;
}