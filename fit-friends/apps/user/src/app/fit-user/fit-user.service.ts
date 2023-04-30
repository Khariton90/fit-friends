import { UserQuestionnareRdo } from './../questionnaire/rdo/user-questionnare.rto';
import { FitUserRdo } from './rdo/fit-user.rdo';
import { createEvent, fillObject } from '@fit-friends/core';
import { UpdateFitUserDto } from './dto/update-fit-user.dto';
import { CreateFitUserDto } from './dto/create-fit-user.dto';
import { QuestionnaireRepository } from './../questionnaire/questionnaire.repository';
import { FitUserRepository } from './fit-user.repository';
import { FitUserEntity } from './fit-user-entity';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import { CommandEvent, UserRole } from '@fit-friends/shared-types';
import { CoachQuestionnareRdo } from '../questionnaire/rdo/coach-questionnare.rto';
import { ClientProxy } from '@nestjs/microservices';
import { FitUserQuery } from './query/fit-user.query';
import { FavoritesGymService } from '../favorites-gym/favorites-gym.service';
import { FriendsService } from '../friends/friends.service';
import { FoodJournalService } from '../food-journal/food-journal.service';

@Injectable()
export class FitUserService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly questionnaireRepository: QuestionnaireRepository,
    private readonly favoritesGymService: FavoritesGymService,
    private readonly friendsService: FriendsService,
    private readonly foodJournalService: FoodJournalService,
    @Inject("RABBITMQ_SERVICE") private readonly rabbitClient: ClientProxy,
  ) { }

  async register(dto: CreateFitUserDto) {
    const { username, email, avatar, password, gender, dateBirth, role, location } = dto;
    const existUser = await this.fitUserRepository.findByEmail(email);

    if (existUser) {
      throw new BadRequestException('User already exist')
    }

    const fitUser = {
      username, 
      email, 
      avatar, 
      passwordHash: '', 
      gender, 
      dateBirth: 
      dayjs(dateBirth).toDate(), 
      role, 
      location, 
      createdAt: dayjs().toDate()
    }
    const fitUserEntity = await new FitUserEntity(fitUser).setPassword(password);
    const createFitUser = await this.fitUserRepository.create(fitUserEntity);

    if (role === UserRole.User) {
      await this.favoritesGymService.create(createFitUser._id);
      await this.friendsService.create(createFitUser._id);
    }

    return createFitUser;
  }

  async find(role: string, query: FitUserQuery) {
    if (role !== UserRole.User) {
      throw new BadRequestException('List with users is only available for the type user')
    }
    
    return await this.fitUserRepository.find(query);
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

  async findByEmail(email: string) {
    const existUser = await this.fitUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} was not found`)
    }

    return existUser;
  }

  async update(id:string, dto: UpdateFitUserDto) {
    const existUser = await this.fitUserRepository.findById(id);

    if (existUser._id.toString() !== id) {
      throw new BadRequestException('Editing is only possible for an authorized user')
    }

    return await this.fitUserRepository.update(id, dto);
  }

  async findSubscriber(id: string, date: Date) {
    const subscriber = await this.fitUserRepository.findById(id);
    if (!subscriber) {
      throw new NotFoundException(`A user with ID ${id} was not found`)
    }

    this.rabbitClient.emit(createEvent(CommandEvent.AddSubscriber), {
      user: subscriber.username,
      email: subscriber.email,
      date: date
    })
  }
}
