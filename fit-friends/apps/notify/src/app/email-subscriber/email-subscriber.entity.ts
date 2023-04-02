import { Subscriber } from '@fit-friends/shared-types';

export class EmailSubscriberEntity implements Subscriber {
  public id: string;
  public email: string;
  public username: string;
  public user: string;
  public date: Date;

  
  constructor(subscriber: Subscriber) {
    this.fillEntity(subscriber);
  }

  public fillEntity(subscriber: Subscriber) {
    this.email = subscriber.email;
    this.username = subscriber.username;
    this.id = subscriber.id;
    this.user = subscriber.user;
    this.date = subscriber.date;
  }

  public toObject() {
    return {...this};
  }
}