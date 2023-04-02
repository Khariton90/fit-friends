import { JwtStrategy } from './strategies/jwt.strategy';
import { PersonalTrainingRepository } from './personal-training.repository';
import { PersonalTrainingModel, PersonalTrainingSchema } from './personal-training.model';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_PERSONAL_TRAINING_PATH, RABBITMQ_SERVICE } from './app.constant';
import { AppController } from './personal-training.controller';
import { AppService } from './personal-training.service';
import databaseConfig from './config/database.config';
import { getMongoDbConfig } from './config/mongodb.config';
import envSchema from './env.schema';
import { jwtOptions } from './config/jwt.config';
import { getRabbitMqConfig, rabbitMqOptions } from './config/rabbitmq.config';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PERSONAL_TRAINING_PATH,
      load: [databaseConfig, jwtOptions, rabbitMqOptions],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig(),
    ),
    MongooseModule.forFeature([
      {name: PersonalTrainingModel.name, schema: PersonalTrainingSchema}
    ]),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      }
    ]),
  ],

  controllers: [AppController],
  providers: [AppService, PersonalTrainingRepository, JwtStrategy],
})
export class AppModule {}
