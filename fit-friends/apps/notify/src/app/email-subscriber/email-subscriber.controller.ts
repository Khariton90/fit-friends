import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { Controller } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@fit-friends/shared-types';
import { createEvent } from '@fit-friends/core';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
  ) {}

  @EventPattern(createEvent(CommandEvent.AddSubscriber))
  public async create(subscriber: CreateEmailSubscriberDto) {
    return this.emailSubscriberService.addSubscriber(subscriber);
  }
}

