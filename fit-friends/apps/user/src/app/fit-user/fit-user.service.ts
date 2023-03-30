import { UserQuestionnareRdo } from './../questionnaire/rdo/user-questionnare.rto';
import { FitUserRdo } from './rdo/fit-user.rdo';
import { fillObject } from '@fit-friends/core';
import { UpdateFitUserDto } from './dto/update-fit-user.dto';
import { CreateFitUserDto } from './dto/create-fit-user.dto';
import { QuestionnaireRepository } from './../questionnaire/questionnaire.repository';
import { FitUserRepository } from './fit-user.repository';
import { FitUserEntity } from './fit-user-entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import { UserRole } from '@fit-friends/shared-types';
import { CoachQuestionnareRdo } from '../questionnaire/rdo/coach-questionnare.rto';

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

    if (!user) {
      throw new NotFoundException('There is no user with such ID')
    }

    if (user.role === UserRole.User) {
      const question = await this.questionnaireRepository.findUser(id);
      const userValue = fillObject(FitUserRdo, user);
      const questionValue = fillObject(UserQuestionnareRdo, question);
  
      return {
        ...userValue,
        question: {
          ...questionValue
        }
      }
    } else {
      const question = await this.questionnaireRepository.findCoach(id);
      const userValue = fillObject(FitUserRdo, user);
      const questionValue = fillObject(CoachQuestionnareRdo, question);
      return {
        ...userValue,
        question: {
          ...questionValue
        }
      }
    }
  }

  async update(id:string, dto: UpdateFitUserDto) {
    const existUser = await this.fitUserRepository.findById(id);

    if (existUser._id.toString() !== id) {
      throw new BadRequestException('Editing is only possible for an authorized user')
    }

    return await this.fitUserRepository.update(id, dto);
  }
}
