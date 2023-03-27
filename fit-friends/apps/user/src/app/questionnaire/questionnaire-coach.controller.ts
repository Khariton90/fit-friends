import { ApiTags } from '@nestjs/swagger';
import { fillObject } from '@fit-friends/core';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CoachQuestionnareRdo } from './rdo/coach-questionnare.rto';
import { createCoachQuestionnareDto } from './dto/create-coach-questionnare.dto';

@ApiTags('The questionnaire of coach')
@Controller('questionnaire-coach')
export class QuestionnaireCoachController {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
  ) {}

  @Post('/:id')
  async create(@Param('id') id: string, @Body() dto: createCoachQuestionnareDto) {
    const question = await this.questionnaireService.findCoachOrCreate(dto);
    return fillObject(CoachQuestionnareRdo, question);
  }
}
