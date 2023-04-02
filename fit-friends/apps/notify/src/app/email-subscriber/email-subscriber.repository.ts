import { CRUDRepository } from "@fit-friends/core";
import { EmailSubscriberEntity } from "./email-subscriber.entity";
import { Subscriber } from "@fit-friends/shared-types";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SubscriberModel } from "./email-subscriber.model";
import { Model } from 'mongoose';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepository<EmailSubscriberEntity, string, Subscriber> {

  constructor(
    @InjectModel(SubscriberModel.name) private readonly subscriberModel: Model<SubscriberModel>,
  ) {}

  public async create(item: EmailSubscriberEntity): Promise<Subscriber> {
    const newSubscriber = new this.subscriberModel(item);
    return newSubscriber.save();
  }

  public async findById(id: string): Promise<Subscriber | null> {
    return this.subscriberModel.findOne({id}).exec();
  }

  public async findByEmail(email: string): Promise<Subscriber | null> {
    return this.subscriberModel.findOne({email}).exec();
  }

  public async update(id: string, item: EmailSubscriberEntity): Promise<Subscriber> {
    return this.subscriberModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    this.subscriberModel.deleteOne({id});
  }
}