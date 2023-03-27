import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';

@Module({
  providers: [EmailSubscriberService],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule {}
