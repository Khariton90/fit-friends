import { ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { getMongoDbConnectionString } from "@fit-friends/core";

export function getMongoDbConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      const uri = getMongoDbConnectionString({
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        databaseName: configService.get('database.name'),
        authDatabase: configService.get('database.authBase'),
      });

      return {
        uri: uri
      }
    },
    inject: [ConfigService]
  }
}