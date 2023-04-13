import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GymService } from './gym.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGymDto } from './dto/create-gym.dto';
import { CheckMongoidValidationPipe, fillObject } from '@fit-friends/core';
import { GymRdo } from './rdo/gym.rdo';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config/multer.config';
import { BASE_URL_PHOTO } from './app.constant';
import { Express } from 'express';
import { GymQuery } from './query/gym.query';

type File = Express.Multer.File;

@ApiTags('Gym')
@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) { }

  @Post('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GymRdo,
    description: 'New sports gym was created'
  })
  @ApiOperation({summary: 'Creating a new sports gym'})
  async createNewGym(@Body() dto: CreateGymDto) {
    const newGym = await this.gymService.createGym(dto);
    return fillObject(GymRdo, newGym);
  }

  @Get('all')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [GymRdo],
    description: 'A list of sports gym was received'
  })
  @ApiOperation({summary: 'Get list sport gyms'})
  async findAllGyms(@Query() query: GymQuery) {
    const gymList = await this.gymService.findAll(query);
    return fillObject(GymRdo, gymList);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: GymRdo,
    description: 'A sport gym was received'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'This gym was not found'
  })
  @ApiOperation({summary: 'Find gym by ID'})
  async findGym(@Param('id', CheckMongoidValidationPipe) id) {
    const gym = await this.gymService.findGym(id);
    return fillObject(GymRdo, gym);
  }

  @Post('upload')
  @ApiOperation({summary: 'Download new image on gym'})
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@UploadedFile() file: File) {
    const response = `${BASE_URL_PHOTO}${file.filename}`
    return response;
  }

  @Get('upload/:filename')
  @ApiOperation({summary: 'Get a link to the image'})
  async getPhoto(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, { root: './uploads' });
  }
}
