import { createQuestionnareDto } from './dto/create-questionnare.dto';
import { QuestionnaireModel } from './questionnaire.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class QuestionnaireRepository {
  constructor(
    @InjectModel(QuestionnaireModel.name) private readonly questionnaireModel: Model<QuestionnaireModel>
  ) {}

  async find(userId: string) {
    const existQuestion = await this.questionnaireModel.findOne({userId});
    return existQuestion;
  }

  async create(dto: createQuestionnareDto) {
    const newQuestion = await this.questionnaireModel.create(dto);
    return newQuestion.save();
  }
}