import { CreateFitUserDto } from './dto/create-fit-user.dto';
import { ResponseUserQuestionnare } from './../questionnaire/rdo/user-questionnare.rto';
import { ResponseUserDto } from './../auth/rdo/response-user.dto';
import { QuestionnaireRepository } from './../questionnaire/questionnaire.repository';
import { FitUserRepository } from './fit-user.repository';
import { FitUserEntity } from './fit-user-entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import { fillObject } from '@fit-friends/core';
import { UserRole } from '@fit-friends/shared-types';

@Injectable()
export class FitUserService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly questionnaireRepository: QuestionnaireRepository,
  ) { }

  async register(dto: CreateFitUserDto) {
    const { username, email, avatar, password, gender, dateBirth, role, location } = dto;
    const existUser = await this.fitUserRepository.findByEmail(email);

    if (existUser) {
      throw new BadRequestException('User already exist')
    }

    const fitUser = {
      username, email, avatar, passwordHash: '', gender, dateBirth: dayjs(dateBirth).toDate(), role, location, createdAt: dayjs().toDate()
    }

    const fitUserEntity = await new FitUserEntity(fitUser).setPassword(password);
    const createFitUser = await this.fitUserRepository.create(fitUserEntity);

    return createFitUser;
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
