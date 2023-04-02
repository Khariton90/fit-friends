import { Subscriber } from '@fit-friends/shared-types';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EMAIL_SUBSCRIBER_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  public async sendNotify(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: subscriber.username,
        mail: subscriber.email,
        date: subscriber.date
      }
    })
  }
}
