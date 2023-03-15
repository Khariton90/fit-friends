import { CommentModel, CommentSchema } from './../comment.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { getMongoDbConfig } from './config/mongodb.config';
import { ENV_FILE_COMMENT_PATH } from './app.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_COMMENT_PATH,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig(),
    ),
    MongooseModule.forFeature([
      {name: CommentModel.name, schema: CommentSchema}
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
