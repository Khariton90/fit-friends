import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { FoodJournalService } from './food-journal.service';
import { FoodJournalModel, FoodJournalSchema } from './food-journal.model';
import { FoodJournalRepository } from './food-journal.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: FoodJournalModel.name,
      schema: FoodJournalSchema
    }])
  ],
  providers: [FoodJournalService, FoodJournalRepository],
  exports: [FoodJournalService, FoodJournalRepository]
})
export class FoodJournalModule {}
