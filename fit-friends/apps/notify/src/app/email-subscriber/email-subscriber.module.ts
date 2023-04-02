import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberModel, SubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: SubscriberModel.name, schema: SubscriberSchema },
  ]),
  ],
  providers: [EmailSubscriberService, EmailSubscriberRepository, MailService],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule { }
