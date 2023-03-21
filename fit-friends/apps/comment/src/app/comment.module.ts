import { CommentModel, CommentSchema } from './comment.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './comment.controller';
import { AppService } from './comment.service';
import databaseConfig from './config/database.config';
import { getMongoDbConfig } from './config/mongodb.config';
import { ENV_FILE_COMMENT_PATH } from './comment.constant';
import { CommentRepository } from './comment.repository';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_COMMENT_PATH,
      load: [databaseConfig],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig(),
    ),
    MongooseModule.forFeature([
      {name: CommentModel.name, schema: CommentSchema}
    ])
  ],
  controllers: [AppController],
  providers: [AppService, CommentRepository],
})
export class AppModule {}
