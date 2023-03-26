import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { FitUserEntity } from './fit-user-entity';
import { CRUDRepository } from "@fit-friends/core";
import { User } from '@fit-friends/shared-types';
import { Model } from 'mongoose';
import { UserModel } from './fit-user.model';

@Injectable()
export class FitUserRepository implements CRUDRepository<FitUserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly fitUserModel: Model<UserModel>
  ) {}

  public async find() {
    const users = await this.fitUserModel.find();
    return users;
  }

  public async findById(id: string) {
    const user = await this.fitUserModel.findById(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.fitUserModel.findOne({email}).exec();
  }

  public async create(item: FitUserEntity) {
    const userModel = new this.fitUserModel(item);

    return userModel.save();
  }

  public async update(id: string, item: FitUserEntity): Promise<User> {
    const updateUser = await this.fitUserModel.findByIdAndUpdate(id, item);
    return updateUser;
  }

  public async destroy(id: string): Promise<void> {
    await this.fitUserModel.findByIdAndDelete(id);
  }
}