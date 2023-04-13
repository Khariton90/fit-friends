import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@fit-friends/core';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CoachQuestionnareRdo } from './rdo/coach-questionnare.rto';
import { CreateCoachQuestionnareDto } from './dto/create-coach-questionnare.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExtendedUserRequest } from '@fit-friends/shared-types';

@ApiTags('The questionnaire of coach')
@Controller('questionnaire-coach')
export class QuestionnaireCoachController {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary: 'Adding additional user information with the role "coach"'})
  async create(@Body() dto: CreateCoachQuestionnareDto, @Req() {user}: ExtendedUserRequest) {
    const question = await this.questionnaireService.findCoachOrCreate(dto, user.sub);
    return fillObject(CoachQuestionnareRdo, question);
  }
}
