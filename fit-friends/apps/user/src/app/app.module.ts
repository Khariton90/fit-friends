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
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
