import { ChangePersonalTrainingDto } from './dto/change-personal-training.dto';
import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards, Req, Put, Get, Param } from '@nestjs/common';
import { AppService } from './personal-training.service';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { ApiTags } from '@nestjs/swagger';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { PersonalTrainingRdo } from './rdo/personal-training.rdo';

@ApiTags('Personal-training')
@Controller('personal-training')
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreatePersonalTrainingDto, @Req() req: ExtendedUserRequest) {
    const { user } = req;
    const newTraining = await this.appService.create({ ...dto, initiator: user.sub });
    return fillObject(PersonalTrainingRdo, newTraining);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll(@Req() req: ExtendedUserRequest) {
    const trainingList = await this.appService.findAll(req.user.sub);
    return fillObject(PersonalTrainingRdo, trainingList);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Param('id', CheckMongoidValidationPipe) id: string, @Body() dto: ChangePersonalTrainingDto, @Req() req: ExtendedUserRequest) {
    const { user } = req;
    const newTraining = await this.appService.update(id, dto, user.sub);
    return fillObject(PersonalTrainingRdo, newTraining);
  }
}
