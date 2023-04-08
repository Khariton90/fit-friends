import { ChangePersonalTrainingDto } from './dto/change-personal-training.dto';
import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards, Req, Put, Get, Param, Query, HttpStatus } from '@nestjs/common';
import { AppService } from './personal-training.service';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { PersonalTrainingRdo } from './rdo/personal-training.rdo';
import { PersonalTrainingQuery } from './query/personal-training.query';

@ApiTags('Personal-training')
@Controller('personal-training')
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PersonalTrainingRdo,
    description: 'New personal training was created'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized'
  })
  async create(@Body() dto: CreatePersonalTrainingDto, @Req() req: ExtendedUserRequest) {
    const { user } = req;
    const newTraining = await this.appService.create({ ...dto, initiator: user.sub }, user.email);
    return fillObject(PersonalTrainingRdo, newTraining);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [PersonalTrainingRdo],
    description: 'A list of personal training'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized'
  })
  async findAll(@Req() req: ExtendedUserRequest, @Query() query: PersonalTrainingQuery) {
    const trainingList = await this.appService.findAll(req.user.sub, query);
    return fillObject(PersonalTrainingRdo, trainingList);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PersonalTrainingRdo,
    description: 'Personal training has been changed'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized'
  })
  async update(@Param('id', CheckMongoidValidationPipe) id: string, @Body() dto: ChangePersonalTrainingDto, @Req() req: ExtendedUserRequest) {
    const { user } = req;
    const newTraining = await this.appService.update(id, dto, user.sub);
    return fillObject(PersonalTrainingRdo, newTraining);
  }
}
