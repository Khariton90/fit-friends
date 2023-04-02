import { ENV_FILE_BFF_PATH } from './app.constant';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRabbitMqConfig, rabbitMqOptions } from './config/rabbitmq.config';
import { UsersModule } from './users/users.module';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_BFF_PATH,
      load: [rabbitMqOptions, rabbitMqOptions],
    }),
    UsersModule,
    HttpModule,
    ClientsModule.registerAsync([
      {
        name: "RABBITMQ_SERVICE",
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, HttpModule],
})
export class AppModule {}
