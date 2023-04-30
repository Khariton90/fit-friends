import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_USER_PATH } from './app.constant';
import { ConfigModule } from '@nestjs/config/dist';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { getMongoDbConfig } from './config/mongodb.config';
import { AuthModule } from './auth/auth.module';
import { FitUserModule } from './fit-user/fit-user.module';
import databaseConfig from './config/database.config';
import envSchema from './env.schema';
import { jwtOptions } from './config/jwt.config';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { rabbitMqOptions } from './config/rabbitmq.config';
import { PersonalAccountModule } from './personal-account/personal-account.module';
import { FavoritesGymModule } from './favorites-gym/favorites-gym.module';
import { FriendsModule } from './friends/friends.module';
import { FoodJournalController } from './food-journal/food-journal.controller';
import { FoodJournalModule } from './food-journal/food-journal.module';
import { TrainingJournalModule } from './training-journal/training-journal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_USER_PATH,
      load: [databaseConfig, jwtOptions, rabbitMqOptions],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    AuthModule,
    FitUserModule,
    QuestionnaireModule,
    PersonalAccountModule,
    FavoritesGymModule,
    FriendsModule,
    FoodJournalModule,
    TrainingJournalModule,
  ],
  controllers: [FoodJournalController],
  providers: [AppService],
})
export class AppModule {}
