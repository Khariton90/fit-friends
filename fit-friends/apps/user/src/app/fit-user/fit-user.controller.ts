import { ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './../auth/rdo/response-user.dto';
import { fillObject } from '@fit-friends/core';
import { FitUserService } from './fit-user.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { Controller, Post, Body } from '@nestjs/common';

@ApiTags('Fit-user')
@Controller('fit-user')
export class FitUserController {
  constructor(
    private readonly fitUserService: FitUserService
  ) {}

  @Post('register')
  async create(@Body()dto: CreateUserDto) {
    const newUser = await this.fitUserService.register(dto);
    return fillObject(ResponseUserDto, newUser);
  }
}
