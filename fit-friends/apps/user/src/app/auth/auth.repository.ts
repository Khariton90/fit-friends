import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { AuthModel } from './auth.model';
import { Model } from 'mongoose';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>
  ) { }

  async find(userId: string) {
    const token = await this.authModel.findOne({ userId }).exec();
    return token;
  }

  async create(dto: CreateTokenDto) {
    const { userId } = dto;
    const existToken = await this.authModel.findOne({ userId });

    if (!existToken) {
      const newToken = new this.authModel(dto);
      return newToken.save();
    }

    return existToken;
  }

  async destroy(id: string) {
    await this.authModel.findByIdAndDelete(id);
  }

  async update(dto: CreateTokenDto) {
    await this.authModel.findOneAndUpdate({ refreshToken: dto.refreshToken }, dto);
  }
}