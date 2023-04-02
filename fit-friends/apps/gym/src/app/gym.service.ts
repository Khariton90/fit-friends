import { Injectable, NotFoundException } from '@nestjs/common';
import { GymRepository } from './gym.repository';
import { CreateGymDto } from './dto/create-gym.dto';
import { GymEntity } from './gym.entity';
import { Gym } from '@fit-friends/shared-types';

@Injectable()
export class GymService {
  constructor(
    private readonly gymRepository: GymRepository,
  ) { }

  async createGym(dto: CreateGymDto): Promise<Gym> {
    const newGym = await this.gymRepository.create(new GymEntity(dto));
    return newGym;
  }

  async findAll(): Promise<Gym[] | []> {
    return await this.gymRepository.find();
  }

  async findGym(id: string): Promise<Gym | null> {
    const existGym = await this.gymRepository.findById(id);

    if (!existGym) {
      throw new NotFoundException('Gym with data ID was not found')
    }

    return existGym;
  }
}
