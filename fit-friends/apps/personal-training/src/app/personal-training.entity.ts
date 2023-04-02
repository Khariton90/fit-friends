import { PersonalTraining, PersonalTrainingStatus } from '@fit-friends/shared-types';

export class PersonalTrainingEntity implements PersonalTraining {
  public _id?: string;
  public initiator: string;
  public user: string;
  public changeStatus: Date;
  public status: PersonalTrainingStatus;

  constructor(item: PersonalTraining){
    this.fillObject(item);
  }

  public toObject() {
    return {...this};
  }

  public fillObject(item: PersonalTraining) {
    this.initiator = item.initiator;
    this.user = item.user;
    this.changeStatus = item.changeStatus;
    this.status = item.status;
  }
}