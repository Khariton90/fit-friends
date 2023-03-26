import { DetailedUserDto } from './../dto/detailed-user.dto';
import { ResponseUserQuestionnare } from './../questionnaire/rdo/user-questionnare.rto';
import { ResponseUserDto } from './../auth/rdo/response-user.dto';
import { QuestionnaireRepository } from './../questionnaire/questionnaire.repository';
import { FitUserRepository } from './fit-user.repository';
import { FitUserEntity } from './fit-user-entity';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import { fillObject } from '@fit-friends/core';
import { UserRole } from '@fit-friends/shared-types';

@Injectable()
export class FitUserService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly questionnaireRepository: QuestionnaireRepository,
  ) { }

  async register(dto: DetailedUserDto) {
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
    const newUser = await this.fitUserRepository.create(userEntity);
    const userQuestion = await this.questionnaireRepository.create({...dto.question, userId: newUser._id});
    
    return {
      newUser,
      userQuestion
    }
  }

  async find(role: string) {
    if (role !== UserRole.User) {
      throw new BadRequestException('List with users is only available for the type user')
    }
    
    return await this.fitUserRepository.find();
  }

  async findById(id: string) {
    const user = await this.fitUserRepository.findById(id);
    const question = await this.questionnaireRepository.find(id);

    if (!user) {
      throw new NotFoundException(404, 'User not found');
    }

    const userObj = fillObject(ResponseUserDto, user);
    const questinoObj = fillObject(ResponseUserQuestionnare, question);

    return {
      ...userObj,
      question: {
        ...questinoObj
      }
    };
  }
}
