import { FitUserRdo } from './rdo/fit-user.rdo';
import { CreateFitUserDto } from './dto/create-fit-user.dto';
import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { ApiTags } from '@nestjs/swagger';
import { fillObject } from '@fit-friends/core';
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
  Put 
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CheckMongoidValidationPipe } from '@fit-friends/core';
import { FileInterceptor } from '@nestjs/platform-express';
import dayjs from 'dayjs';
import { BASE_IMAGES_URL } from './fit-user.constant';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { UpdateFitUserDto } from './dto/update-fit-user.dto';

type File = Express.Multer.File;

@ApiTags('Fit-user')
@UseInterceptors()
@Controller('fit-user')
export class FitUserController {
  constructor(
    private readonly fitUserService: FitUserService
  ) { }


  @Post('register')
  async create(@Body() dto: CreateFitUserDto) {
    const newUser = await this.fitUserService.register(dto);

    return fillObject(FitUserRdo, newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async show(@Req() req: ExtendedUserRequest) {
    const users = await this.fitUserService.find(req.user.role);
    return fillObject(FitUserRdo, users);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Param('id', CheckMongoidValidationPipe) id: string) {
    const user = await this.fitUserService.findById(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async update(@Param('id', CheckMongoidValidationPipe) id: string, @Body() dto: UpdateFitUserDto, @Req() req: ExtendedUserRequest) {
    const updateUser = await this.fitUserService.update(req.user.sub, dto);
    return fillObject(FitUserRdo, updateUser);
  }

  @Get('avatar/:filename')
  async getImage(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Post('avatar/upload')
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
}
