import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
  ) {}

  public async addSubscriber(subscriber: CreateEmailSubscriberDto) {
    const newSubscriber = await this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
    this.mailService.sendNotify(newSubscriber);
    return newSubscriber
  }
}
