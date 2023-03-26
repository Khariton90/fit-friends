import { createQuestionnareDto } from './dto/create-questionnare.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
  ) {}

  @Post('/')
  async create(@Body() dto: createQuestionnareDto) {
    const question = await this.questionnaireService.findOrCreate(dto);
    return question;
  }
}
