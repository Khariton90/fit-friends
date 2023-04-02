import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig } from '../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "RABBITMQ_SERVICE",
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      }
    ]),
    HttpModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
