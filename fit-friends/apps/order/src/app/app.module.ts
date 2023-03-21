import { OrderModel, OrderSchema } from './order.model';
import { ENV_FILE_ORDER_PATH } from './app.constant';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from './config/mongodb.config';
import envSchema from './env.schema';

@Module({
  imports: [   
    ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    envFilePath: ENV_FILE_ORDER_PATH,
    load: [databaseConfig],
    validationSchema: envSchema,
  }),
    MongooseModule.forRootAsync(
      getMongoDbConfig(),
    ),
    MongooseModule.forFeature([
      { name: OrderModel.name, schema: OrderSchema  }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
