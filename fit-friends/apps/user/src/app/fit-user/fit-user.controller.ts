import { ExtendedUserRequest } from '@fit-friends/shared-types';
import { DetailedUserDto } from './../dto/detailed-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './../auth/rdo/response-user.dto';
import { fillObject } from '@fit-friends/core';
import { FitUserService } from './fit-user.service';
import { Controller, Post, Body, UseGuards, Get, Param, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CheckMongoidValidationPipe } from 'apps/comment/src/pipes/check-mongo-id-validation-pipe';
import { DetailedUserRdo } from '../rdo/detailed-user.rdo';

@ApiTags('Fit-user')
@Controller('fit-user')
export class FitUserController {
  constructor(
    private readonly fitUserService: FitUserService
  ) {}

  @Post('register')
  async create(@Body()dto: DetailedUserDto) {
    const newUser = await this.fitUserService.register(dto);
    return fillObject(DetailedUserRdo, {...newUser.newUser, question: newUser.userQuestion});
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async show(@Req() req: ExtendedUserRequest) {
    const users = await this.fitUserService.find(req.user.role);
    return fillObject(ResponseUserDto, users);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Param('id', CheckMongoidValidationPipe) id: string, @Req() req: ExtendedUserRequest) {
    console.log(req.user);

    const user = await this.fitUserService.findById(id);
    return fillObject(DetailedUserRdo, user);
  }
}
