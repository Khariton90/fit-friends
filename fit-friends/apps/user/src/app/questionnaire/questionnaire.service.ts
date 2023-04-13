import { CreateCoachQuestionnareDto } from './dto/create-coach-questionnare.dto';
import { QuestionnaireRepository } from './questionnaire.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateQuestionnareDto } from './dto/create-questionnare.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository,
  ) { }

  async findUserOrCreate(dto: CreateQuestionnareDto, userId: string) {
    const existQuestion = await this.questionnaireRepository.findUser(userId);

    if (existQuestion) {
      throw new ConflictException('Description for this user already exists');
    }

    return await this.questionnaireRepository.createUser(dto, userId);
  }

  async findCoachOrCreate(dto: CreateCoachQuestionnareDto, userId: string) {
    const existQuestion = await this.questionnaireRepository.findCoach(userId);

    if (existQuestion) {
      throw new ConflictException('Description for this coach already exists');
    }

    return await this.questionnaireRepository.createCoach(dto, userId);
  }
}
