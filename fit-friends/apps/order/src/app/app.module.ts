import { OrderModel, OrderSchema } from './order.model';
import { ENV_FILE_ORDER_PATH } from './order.constant';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import databaseConfig from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from './config/mongodb.config';
import envSchema from './env.schema';
import { OrderRepository } from './order.repository';
import { jwtOptions } from './config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [   
    ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    envFilePath: ENV_FILE_ORDER_PATH,
    load: [databaseConfig, jwtOptions],
    validationSchema: envSchema,
  }),
    MongooseModule.forRootAsync(
      getMongoDbConfig(),
    ),
    MongooseModule.forFeature([
      { name: OrderModel.name, schema: OrderSchema  }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, JwtStrategy],
})
export class AppModule {}
