import { Module } from '@nestjs/common';
import { TrainingJournalService } from './training-journal.service';
import { TrainingJournalController } from './training-journal.controller';

@Module({
  providers: [TrainingJournalService],
  controllers: [TrainingJournalController],
})
export class TrainingJournalModule {}
