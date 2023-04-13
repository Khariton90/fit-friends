import { FitUserRdo } from './rdo/fit-user.rdo';
import { CreateFitUserDto } from './dto/create-fit-user.dto';
import { CommandEvent, ExtendedUserRequest } from '@fit-friends/shared-types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createEvent, fillObject } from '@fit-friends/core';
import { FitUserService } from './fit-user.service';
import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Get, 
  Param, 
  Req, 
  UseInterceptors, 
  UploadedFile, 
  Res, 
  BadRequestException, 
  Put, 
  Query,
  HttpStatus
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CheckMongoidValidationPipe } from '@fit-friends/core';
import { FileInterceptor } from '@nestjs/platform-express';
import dayjs from 'dayjs';
import { BASE_IMAGES_URL } from './fit-user.constant';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { UpdateFitUserDto } from './dto/update-fit-user.dto';
import { EventPattern } from '@nestjs/microservices';
import { FitUserQuery } from './query/fit-user.query';

type File = Express.Multer.File;

@ApiTags('Fit-user')
@UseInterceptors()
@Controller('fit-user')
export class FitUserController {
  constructor(
    private readonly fitUserService: FitUserService
  ) { }


  @Post('register')
  @ApiResponse({
    status: HttpStatus.OK,
    type: FitUserRdo,
    description: 'User information received'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The wrong data format'
  })
  @ApiOperation({summary: 'New User Registration'})
  async create(@Body() dto: CreateFitUserDto) {
    const newUser = await this.fitUserService.register(dto);

    return fillObject(FitUserRdo, newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [FitUserRdo],
    description: 'A list of users has been received'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @ApiOperation({summary: 'Show a list of registered users'})
  async show(@Query() query: FitUserQuery, @Req() req: ExtendedUserRequest) {
    const users = await this.fitUserService.find(req.user.role, query);
    return fillObject(FitUserRdo, users);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: FitUserRdo,
    description: 'Show user information on ID'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @ApiOperation({summary: 'Show user information on ID'})
  async findById(@Param('id', CheckMongoidValidationPipe) id: string) {
    const user = await this.fitUserService.findById(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: FitUserRdo,
    description: 'Changed user information'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @ApiOperation({summary: 'Edition of user information'})
  async update(@Body() dto: UpdateFitUserDto, @Req() req: ExtendedUserRequest) {
    const updateUser = await this.fitUserService.update(req.user.sub, dto);
    return fillObject(FitUserRdo, updateUser);
  }

  @Get('avatar/:filename')
  @ApiOperation({summary: 'Obtaining a link to the user avatar'})
  async getImage(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Post('avatar/upload')
  @ApiOperation({summary: 'Downloading user avatar'})
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const fileExtention = file.originalname.split('.')[1];
        const newFileName = `avatar-${dayjs().format('YYYY-MM-DDTHH-mm-ss')}.${fileExtention}`
        cb(null, newFileName);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(null, false);
      }

      cb(null, true);
    }
  }))
  async uploadImage(@UploadedFile() file: File) {
    if (!file) {
      throw new BadRequestException('File is not image');
    }

    const response = `${BASE_IMAGES_URL}${file.filename}`
    return response;
  }

  @EventPattern(createEvent(CommandEvent.AddPurchase))
  async getSubscriber(subscriber: {id: string, date: Date}) {
    await this.fitUserService.findSubscriber(subscriber.id, subscriber.date);
  }
}
