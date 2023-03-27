import { JwtStrategy } from './strategies/jwt.strategy';
import { WorkoutRepository } from './workout.repository';
import { WorkoutModel, WorkoutSchema } from './workout.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_WORKOUT_PATH } from './app.constant';
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
      envFilePath: ENV_FILE_WORKOUT_PATH,
      load: [databaseConfig, jwtOptions],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig(),
    ),
    MongooseModule.forFeature([
      {name: WorkoutModel.name, schema: WorkoutSchema}
    ])
  ],
  controllers: [AppController],
  providers: [AppService, WorkoutRepository, JwtStrategy],
})
export class AppModule {}
