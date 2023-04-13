import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserQuestionnareRdo } from './rdo/user-questionnare.rto';
import { fillObject } from '@fit-friends/core';
import { CreateQuestionnareDto } from './dto/create-questionnare.dto';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExtendedUserRequest } from '@fit-friends/shared-types';

@ApiTags('The questionnaire of user')
@Controller('questionnaire')
export class QuestionnaireController {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary: 'Adding additional user information with the role "user"'})
  async create(@Body() dto: CreateQuestionnareDto, @Req() {user}: ExtendedUserRequest) {
    const question = await this.questionnaireService.findUserOrCreate(dto, user.sub);
    return fillObject(UserQuestionnareRdo, question);
  }
}
