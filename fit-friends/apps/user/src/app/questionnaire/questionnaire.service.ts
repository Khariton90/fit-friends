import { QuestionnaireRepository } from './questionnaire.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { createQuestionnareDto } from './dto/create-questionnare.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository,
  ) { }

  async findOrCreate(dto: createQuestionnareDto) {
    const existQuestion = await this.questionnaireRepository.find(dto.userId);

    if (existQuestion) {
      throw new ConflictException();
    }

    return await this.questionnaireRepository.create(dto);
  }
}
