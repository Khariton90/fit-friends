import { FoodJournalModel } from './food-journal.model';
import { CRUDRepository } from "@fit-friends/core";
import { FoodJournalEntity } from "./food-journal.entity";
import { FoodJournal } from "@fit-friends/shared-types";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class FoodJournalRepository implements CRUDRepository<FoodJournalEntity, string, FoodJournal> {
  constructor(
    @InjectModel(FoodJournalModel.name) private readonly foodJournalModel: Model<FoodJournalModel>
  ) {}

  public async find(id: string): Promise<FoodJournal[]> {
    const existFoodJournal = await this.foodJournalModel.find({user: id}).exec();
    return existFoodJournal;
  }

  public async findById(id: string): Promise<FoodJournal> {
    const existFoodJournal = await this.foodJournalModel.findOne({user: id}).exec();
    return existFoodJournal;
  }

  public async create(item: FoodJournalEntity): Promise<FoodJournal> {
    const newFoodJournal = new this.foodJournalModel(item);
    return newFoodJournal.save();
  }

  public async update(id: string, item: FoodJournalEntity): Promise<FoodJournal> {
    const updatedFoodJournal = await this.foodJournalModel.findOneAndUpdate({_id: id}, item, {new: true}).exec();
    return updatedFoodJournal;
  }

  public async destroy(id: string): Promise<void> {
    await this.foodJournalModel.findOneAndDelete({user: id});
  }
}