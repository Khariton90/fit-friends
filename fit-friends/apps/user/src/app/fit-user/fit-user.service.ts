import { FitUserRepository } from './fit-user.repository';
import { FitUserEntity } from './fit-user-entity';
import { CreateUserDto } from './../dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class FitUserService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
  ) { }

  async register(dto: CreateUserDto) {
    const {
      username,
      email,
      avatar,
      password,
      gender,
      role,
      location,
    } = dto;

    if (await this.fitUserRepository.findByEmail(email)) {
      throw new ConflictException(409, 'User already exist');
    }

    const user = { 
      username, 
      email, 
      avatar, 
      passwordHash: password, 
      gender, 
      dateBirth: dayjs().toDate(), 
      role, 
      location, 
      createdAt: dayjs().toDate(),
    };

    const userEntity = await new FitUserEntity(user).setPassword(dto.password);
    return await this.fitUserRepository.create(userEntity);
  }
}
