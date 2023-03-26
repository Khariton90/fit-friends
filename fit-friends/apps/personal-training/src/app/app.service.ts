import { PersonalTrainingEntity } from './personal-training.entity';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { PersonalTrainingRepository } from './personal-training.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import dayjs from 'dayjs';
import { ChangePersonalTrainingDto } from './dto/change-personal-training.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly personalTrainingRepository: PersonalTrainingRepository,
  ) { }

  async create(dto: CreatePersonalTrainingDto) {
    const { initiator, user } = dto;

    if (initiator === user) {
      throw new BadRequestException('The user who initiates the training cannot be selected.');
    }
    const newTraining = {
      ...dto,
      createdAt: dayjs().toDate()
    }

    const entity = new PersonalTrainingEntity(newTraining);
    return await this.personalTrainingRepository.create(entity);
  }

  async update(id: string, dto: ChangePersonalTrainingDto) {
    const entity = new PersonalTrainingEntity({...dto, createdAt: dayjs().toDate()});

    return await this.personalTrainingRepository.update(id, entity);
  }
}
