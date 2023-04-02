import { PersonalTrainingStatus } from "./personal-training-status.enum";

export interface PersonalTraining {
  _id?: string;
  initiator: string;
  user: string;
  changeStatus: Date;
  status: PersonalTrainingStatus;
}