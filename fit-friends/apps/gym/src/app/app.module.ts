import { GymModel, GymSchema } from './gym.model';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_GYM_PATH } from './app.constant';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import databaseConfig from './config/database.config';
import { getMongoDbConfig } from './config/mongodb.config';
import envSchema from './env.schema';
import { GymRepository } from './gym.repository';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig } from './config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_GYM_PATH,
      load: [databaseConfig],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig(),
    ),
    MongooseModule.forFeature([
      {name: GymModel.name, schema: GymSchema}
    ]),
    ClientsModule.registerAsync([
      {
        name: "RABBITMQ_SERVICE",
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      }
    ]),
  ],
  controllers: [GymController],
  providers: [GymService, GymRepository],
})
export class AppModule {}
