import { PersonalTrainingModel } from './personal-training.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from "@fit-friends/core";
import { PersonalTraining } from "@fit-friends/shared-types";
import { PersonalTrainingEntity } from "./personal-training.entity";
import { Model } from 'mongoose';

@Injectable()
export class PersonalTrainingRepository implements CRUDRepository<PersonalTrainingEntity, string, PersonalTraining> {
  constructor(
    @InjectModel(PersonalTrainingModel.name) private readonly personalTrainingModel: Model<PersonalTrainingModel>,
  ){}

  async find(id: string) {
    return this.personalTrainingModel.find({id}).exec();
  }

  async findById(id: string): Promise<PersonalTraining | null> {
    return this.personalTrainingModel.findOne({id}).exec();
  }

  async create(item: PersonalTrainingEntity): Promise<PersonalTraining> {
    const newTraining = new this.personalTrainingModel(item);
    return newTraining.save();
  }

  async update(id: string, item: PersonalTrainingEntity): Promise<PersonalTraining> {
    const updateTraining = await this.personalTrainingModel
      .findOneAndUpdate({id}, item.toObject(), {new: true}).exec();
    return updateTraining
  }
  
  async destroy(id: string): Promise<void> {
    this.personalTrainingModel.findOneAndDelete({id});
  }
}