import { createQuestionnareDto } from './dto/create-questionnare.dto';
import { QuestionnaireModel } from './questionnaire.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { QuestionnaireCoachModel } from './questionnaire-coach.model';
import { createCoachQuestionnareDto } from './dto/create-coach-questionnare.dto';

@Injectable()
export class QuestionnaireRepository {
  constructor(
    @InjectModel(QuestionnaireModel.name) private readonly questionnaireModel: Model<QuestionnaireModel>,
    @InjectModel(QuestionnaireCoachModel.name) private readonly questionnaireCoachModel: Model<QuestionnaireCoachModel>,
  ) {}

  async findUser(userId: string) {
    const existQuestion = await this.questionnaireModel.findOne({userId});
    return existQuestion;
  }

  async findCoach(userId: string) {
    const existQuestion = await this.questionnaireCoachModel.findOne({userId});
    return existQuestion;
  }

  async createUser(dto: createQuestionnareDto) {
    const newQuestion = await this.questionnaireModel.create(dto);
    return newQuestion.save();
  }

  async createCoach(dto: createCoachQuestionnareDto) {
    const newQuestion = await this.questionnaireCoachModel.create(dto);
    return newQuestion.save();
  }
}