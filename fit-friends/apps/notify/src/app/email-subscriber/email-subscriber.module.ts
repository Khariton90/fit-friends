import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberModel, SubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: SubscriberModel.name, schema: SubscriberSchema },
  ]),
  ],
  providers: [EmailSubscriberService, EmailSubscriberRepository],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule { }
