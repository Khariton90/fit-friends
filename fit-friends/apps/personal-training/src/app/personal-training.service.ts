import { PersonalTrainingEntity } from './personal-training.entity';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { PersonalTrainingRepository } from './personal-training.repository';
import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { ChangePersonalTrainingDto } from './dto/change-personal-training.dto';
import { CommandEvent, PersonalTraining } from '@fit-friends/shared-types';
import dayjs from 'dayjs';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@fit-friends/core';

@Injectable()
export class AppService {
  constructor(
    private readonly personalTrainingRepository: PersonalTrainingRepository,
    @Inject("RABBITMQ_SERVICE") private readonly rabbitClient: ClientProxy,
  ) { }

  async create(dto: CreatePersonalTrainingDto, email: string) {
    const { initiator, user } = dto;

    if (initiator === user) {
      throw new BadRequestException('The user who initiates the training cannot be selected.');
    }

    const createTraining = await this.personalTrainingRepository
      .create(new PersonalTrainingEntity({...dto, changeStatus: dayjs().toDate()}));

      this.rabbitClient.emit(
      createEvent(CommandEvent.AddPurchase),
      {
        id: dto.user,
        initiator: email,
        date: dayjs().toDate()
      }
    )
    return createTraining;
  }

  async findAll(id: string): Promise<PersonalTraining[] | []> {
    return await this.personalTrainingRepository.find(id);
  }

  async update(id: string, dto: ChangePersonalTrainingDto, userId: string) {
    const existTraining = await this.personalTrainingRepository.findById(id);

    if (!existTraining) {
      throw new NotFoundException('This training was not found');
    }

    if (existTraining.initiator !== userId && existTraining.user !== userId) {
      throw new BadRequestException('The initiator or user can change the status')
    }

    const entity = new PersonalTrainingEntity({
      initiator: existTraining.initiator, 
      user: existTraining.user, 
      changeStatus: existTraining.changeStatus, 
      status: dto.status
    });
    return await this.personalTrainingRepository.update(id, entity);
  }
}
