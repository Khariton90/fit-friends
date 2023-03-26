import { QuestionnaireModule } from './../questionnaire/questionnaire.module';
import { FitUserRepository } from './fit-user.repository';
import { Module } from '@nestjs/common';
import { FitUserService } from './fit-user.service';
import { FitUserController } from './fit-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: UserModel.name,
      schema: UserSchema,
    },
  ]),
  QuestionnaireModule
],
  providers: [FitUserService, FitUserRepository],
  controllers: [FitUserController],
  exports: [FitUserRepository]
})
export class FitUserModule {}
