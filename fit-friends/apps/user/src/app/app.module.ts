import { UserModel, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_USER_PATH } from './app.constant';
import { ConfigModule } from '@nestjs/config/dist';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getMongoDbConfig } from './config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_USER_PATH
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    MongooseModule.forFeature([
      {
        name: UserModel.name, schema: UserSchema
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
