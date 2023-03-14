import { PersonalTrainingStatus } from "./personal-training-status.enum";

export interface PersonalTraining {
  _id?: string;
  initiator: string;
  user: string;
  createdAt: Date;
  changeStatus: Date;
  status: PersonalTrainingStatus;
}