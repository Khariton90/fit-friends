import { QuestionnaireModel } from './../questionnaire/questionnaire.model';
import { UpdateFitUserDto } from './dto/update-fit-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { FitUserEntity } from './fit-user-entity';
import { CRUDRepository } from "@fit-friends/core";
import { User } from '@fit-friends/shared-types';
import { Model } from 'mongoose';
import { UserModel } from './fit-user.model';
import { FitUserQuery } from './query/fit-user.query';

const DEFAULT_LIMIT_USERS = 50;

@Injectable()
export class FitUserRepository implements CRUDRepository<FitUserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly fitUserModel: Model<UserModel>,
    @InjectModel(QuestionnaireModel.name) private readonly questionnaireModel: Model<QuestionnaireModel>
  ) { }

  public async find(query: FitUserQuery) {
    const pageOptions = {
      page: query.skip > 1 ? query.skip - 1 : 0,
    }

    const users = await this.fitUserModel.find()
      .limit(DEFAULT_LIMIT_USERS)
      .skip(pageOptions.page * DEFAULT_LIMIT_USERS).exec();
      
    return users;
  }

  public async findById(id: string) {
    const user = await this.fitUserModel.findById(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.fitUserModel.findOne({ email }).exec();
  }

  public async create(item: FitUserEntity) {
    const userModel = new this.fitUserModel(item);

    return userModel.save();
  }

  public async update(id: string, item: UpdateFitUserDto): Promise<User> {
    const updateUser = await this.fitUserModel.findByIdAndUpdate(id, item, { new: true });
    return updateUser;
  }

  public async destroy(id: string): Promise<void> {
    await this.fitUserModel.findByIdAndDelete(id);
  }
}