import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards, Req, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';

@Controller('personal-training')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() dto: CreatePersonalTrainingDto, @Req() req: ExtendedUserRequest) {
    const { user } = req;
    const newTraining = await this.appService.create({ ...dto, initiator: user.sub });
    return newTraining;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Body() dto: CreatePersonalTrainingDto, @Req() req: ExtendedUserRequest) {
    const { user } = req;
    const newTraining = await this.appService.update(user.sub, dto);
    return newTraining;
  }
}
