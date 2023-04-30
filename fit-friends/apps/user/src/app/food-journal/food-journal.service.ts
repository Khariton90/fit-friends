import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodJournalRepository } from './food-journal.repository';
import { FoodJournalEntity } from './food-journal.entity';
import { FoodJournalDto } from './dto/food-journal.dto';

@Injectable()
export class FoodJournalService {
  constructor(
    private readonly foodJournalRepository: FoodJournalRepository
  ) {}

  public async find(id: string) {
    const existFoodJournal = await this.foodJournalRepository.find(id);

    if (!existFoodJournal.length) {
      throw new NotFoundException('Nutrition journal was not found')
    }
    return existFoodJournal;
  }

  public async create(userId: string, dto: FoodJournalDto) {
    const entity = new FoodJournalEntity({user: userId, ...dto});
    await this.foodJournalRepository.create(entity);
    const journal = await this.foodJournalRepository.find(userId);
    return journal;
  }

  public async update(id: string, dto: FoodJournalDto, userId: string) {
    const entity = new FoodJournalEntity({user: userId, ...dto})
    const updatedFoodJournal = await this.foodJournalRepository.update(id, entity);
    const journal = await this.foodJournalRepository.find(updatedFoodJournal.user);
    return journal;
  }
}
