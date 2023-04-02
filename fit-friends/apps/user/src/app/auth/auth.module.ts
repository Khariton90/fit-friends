import { AuthModel, AuthModelSchema } from './auth.model';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './../strategies/jwt.strategy';
import { FitUserModule } from './../fit-user/fit-user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../config/jwt.config';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthModel.name,
        schema: AuthModelSchema,
      },
    ]),
    FitUserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, AuthRepository],
})
export class AuthModule {}
