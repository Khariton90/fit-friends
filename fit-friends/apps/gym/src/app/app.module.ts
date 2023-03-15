import { GymModel, GymSchema } from './gym.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_GYM_PATH } from './app.constant';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { getMongoDbConfig } from './config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_GYM_PATH,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig(),
    ),
    MongooseModule.forFeature([
      {name: GymModel.name, schema: GymSchema}
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
