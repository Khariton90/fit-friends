import { ResponseUserDto } from './rdo/response-user.dto';
import { LoginUserDto } from './../dto/login-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { fillObject } from '@fit-friends/core';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('verify')
  public async verifyUser(@Body() dto: LoginUserDto) {
    const user = await this.authService.authorization(dto);

    return fillObject(ResponseUserDto, user);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.authorization(dto);
    return this.authService.login(user);
  }
}


