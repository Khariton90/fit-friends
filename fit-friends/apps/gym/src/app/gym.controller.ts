import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GymService } from './gym.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateGymDto } from './dto/create-gym.dto';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { GymRdo } from './rdo/gym.rdo';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config/multer.config';
import { BASE_URL_PHOTO } from './app.constant';

type File = Express.Multer.File;

@ApiTags('Gym')
@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) { }

  @Post('create')
  async createNewGym(@Body() dto: CreateGymDto) {
    const newGym = await this.gymService.createGym(dto);
    return fillObject(GymRdo, newGym);
  }

  @Get('all')
  async findAllGyms() {
    const gymList = await this.gymService.findAll();
    return fillObject(GymRdo, gymList);
  }

  @Get(':id')
  async findGym(@Param('id', CheckMongoidValidationPipe) id) {
    const gym = await this.gymService.findGym(id);
    return fillObject(GymRdo, gym);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@UploadedFile() file: File) {
    const response = `${BASE_URL_PHOTO}${file.filename}`
    return response;
  }

  @Get('upload/:filename')
  async getPhoto(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, { root: './uploads' });
  }
}
