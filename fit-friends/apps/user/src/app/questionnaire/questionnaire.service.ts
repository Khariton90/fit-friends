import { CreateCoachQuestionnareDto } from './dto/create-coach-questionnare.dto';
import { QuestionnaireRepository } from './questionnaire.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateQuestionnareDto } from './dto/create-questionnare.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository,
  ) { }

  async findUserOrCreate(dto: CreateQuestionnareDto) {
    const existQuestion = await this.questionnaireRepository.findUser(dto.userId);

    if (!existQuestion) {
      return await this.questionnaireRepository.createUser(dto);
    }

    throw new ConflictException('Description for this user already exists');
  }

  async findCoachOrCreate(dto: CreateCoachQuestionnareDto) {
    const existQuestion = await this.questionnaireRepository.findCoach(dto.userId);

    if (!existQuestion) {
      return await this.questionnaireRepository.createCoach(dto);
    }

    throw new ConflictException('Description for this coach already exists');
  }
}
