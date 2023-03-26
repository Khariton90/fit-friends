import { QuestionnaireModel, QuestionnaireModelSchema } from './questionnaire.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireRepository } from './questionnaire.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: QuestionnaireModel.name,
        schema: QuestionnaireModelSchema,
      },
    ]),
  ],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService, QuestionnaireRepository],
  exports: [QuestionnaireService, QuestionnaireRepository]
})
export class QuestionnaireModule {}
