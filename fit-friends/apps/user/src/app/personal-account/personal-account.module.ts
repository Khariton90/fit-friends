import { Module } from '@nestjs/common';
import { PersonalAccountService } from './personal-account.service';
import { PersonalAccountController } from './personal-account.controller';
import { FavoritesGymService } from '../favorites-gym/favorites-gym.service';
import { FavoritesGymModule } from '../favorites-gym/favorites-gym.module';
import { getRabbitMqConfig } from '../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { FriendsModule } from '../friends/friends.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "RABBITMQ_SERVICE",
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      }
    ]),
    FavoritesGymModule,
    FriendsModule
  ],
  providers: [PersonalAccountService, FavoritesGymService],
  controllers: [PersonalAccountController],
})
export class PersonalAccountModule {}
