import { ConflictException, Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
  ) {}

  public async addSubscriber(subscriber: CreateEmailSubscriberDto) {
    const { email } = subscriber;

    const existSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    // if (existSubscriber) {
    //   throw new ConflictException('The subscriber already exists');
    // }

    return this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
  }
}
