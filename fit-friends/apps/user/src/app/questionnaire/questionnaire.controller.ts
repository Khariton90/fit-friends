import { ApiTags } from '@nestjs/swagger';
import { UserQuestionnareRdo } from './rdo/user-questionnare.rto';
import { fillObject } from '@fit-friends/core';
import { CreateQuestionnareDto } from './dto/create-questionnare.dto';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';

@ApiTags('The questionnaire of user')
@Controller('questionnaire')
export class QuestionnaireController {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
  ) {}

  @Post('/:id')
  async create(@Param('id') id: string, @Body() dto: CreateQuestionnareDto) {
    const question = await this.questionnaireService.findUserOrCreate(dto);
    return fillObject(UserQuestionnareRdo, question);
  }
}
