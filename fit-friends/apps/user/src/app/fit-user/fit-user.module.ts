import { QuestionnaireModel, QuestionnaireModelSchema } from './../questionnaire/questionnaire.model';
import { QuestionnaireModule } from './../questionnaire/questionnaire.module';
import { FitUserRepository } from './fit-user.repository';
import { Module } from '@nestjs/common';
import { FitUserService } from './fit-user.service';
import { FitUserController } from './fit-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './fit-user.model';
import { QuestionnaireCoachModel, QuestionnaireCoachModelSchema } from '../questionnaire/questionnaire-coach.model';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig } from '../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';
import { FavoritesGymModule } from '../favorites-gym/favorites-gym.module';
import { FriendsModule } from '../friends/friends.module';
import { FoodJournalModule } from '../food-journal/food-journal.module';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: UserModel.name,
      schema: UserSchema,
    },
    {
      name: QuestionnaireModel.name,
      schema: QuestionnaireModelSchema,
    },
    {
      name: QuestionnaireCoachModel.name,
      schema: QuestionnaireCoachModelSchema,
    }
  ]),
  ClientsModule.registerAsync([
    {
      name: "RABBITMQ_SERVICE",
      useFactory: getRabbitMqConfig,
      inject: [ConfigService],
    }
  ]),
  QuestionnaireModule,
  FavoritesGymModule,
  FriendsModule,
  FoodJournalModule
],
  providers: [FitUserService, FitUserRepository],
  controllers: [FitUserController],
  exports: [FitUserRepository, FitUserService]
})
export class FitUserModule {}
