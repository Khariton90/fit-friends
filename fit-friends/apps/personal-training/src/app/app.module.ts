import { JwtStrategy } from './strategies/jwt.strategy';
import { PersonalTrainingRepository } from './personal-training.repository';
import { PersonalTrainingModel, PersonalTrainingSchema } from './personal-training.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_PERSONAL_TRAINING_PATH } from './app.constant';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { getMongoDbConfig } from './config/mongodb.config';
import envSchema from './env.schema';
import { jwtOptions } from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PERSONAL_TRAINING_PATH,
      load: [databaseConfig, jwtOptions],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig(),
    ),
    MongooseModule.forFeature([
      {name: PersonalTrainingModel.name, schema: PersonalTrainingSchema}
    ])
  ],
  controllers: [AppController],
  providers: [AppService, PersonalTrainingRepository, JwtStrategy],
})
export class AppModule {}
