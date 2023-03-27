import { QuestionnaireModel, QuestionnaireModelSchema } from './questionnaire.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireRepository } from './questionnaire.repository';
import { QuestionnaireCoachModel, QuestionnaireCoachModelSchema } from './questionnaire-coach.model';
import { QuestionnaireCoachController } from './questionnaire-coach.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: QuestionnaireModel.name,
        schema: QuestionnaireModelSchema,
      },
      {
        name: QuestionnaireCoachModel.name,
        schema: QuestionnaireCoachModelSchema,
      },
    ]),
  ],
  controllers: [QuestionnaireController, QuestionnaireCoachController],
  providers: [QuestionnaireService, QuestionnaireRepository],
  exports: [QuestionnaireService, QuestionnaireRepository]
})
export class QuestionnaireModule {}
