import { CRUDRepository } from "@fit-friends/core";
import { GymEntity } from "./gym.entity";
import { Gym } from "@fit-friends/shared-types";
import { InjectModel } from "@nestjs/mongoose";
import { GymModel } from "./gym.model";
import { Model } from 'mongoose';

export class GymRepository implements CRUDRepository<GymEntity, string, Gym> {
  constructor(
    @InjectModel(GymModel.name) private readonly gymModel: Model<GymModel>,
  ) { }

  public async find(): Promise<Gym[] | []> {
    return this.gymModel.find().exec();
  }
  
  public async findById(id: string): Promise<Gym> {
    return this.gymModel.findById(id).exec();
  }
  
  public async create(item: GymEntity): Promise<Gym> {
    const newGym = new this.gymModel(item);
    return newGym.save();
  }
  
  public async update(id: string, item: GymEntity): Promise<Gym> {
    const udpdatedGym  = this.gymModel.findByIdAndUpdate(id, item.toObject(), { new: true }).exec();
    return udpdatedGym;
  }
  
  public async destroy(id: string): Promise<void> {
    this.gymModel.findOneAndDelete({id});
  }

}