import { QuestionnaireModel, QuestionnaireModelSchema } from './../questionnaire/questionnaire.model';
import { QuestionnaireModule } from './../questionnaire/questionnaire.module';
import { FitUserRepository } from './fit-user.repository';
import { Module } from '@nestjs/common';
import { FitUserService } from './fit-user.service';
import { FitUserController } from './fit-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './fit-user.model';
import { QuestionnaireCoachModel, QuestionnaireCoachModelSchema } from '../questionnaire/questionnaire-coach.model';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: UserModel.name,
      schema: UserSchema,
    },
    {
      name: QuestionnaireModel.name,
      schema: QuestionnaireModelSchema,
    },
    {
      name: QuestionnaireCoachModel.name,
      schema: QuestionnaireCoachModelSchema,
    }
  ]),
  QuestionnaireModule
],
  providers: [FitUserService, FitUserRepository],
  controllers: [FitUserController],
  exports: [FitUserRepository]
})
export class FitUserModule {}
