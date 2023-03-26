import { ExtendedUserRequest } from './../../../../../libs/shared-types/src/lib/extended-user-request.interface';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { CheckMongoidValidationPipe } from './../../../../comment/src/pipes/check-mongo-id-validation-pipe';
import { ResponseUserDto } from './rdo/response-user.dto';
import { LoginUserDto } from './../dto/login-user.dto';
import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { fillObject } from '@fit-friends/core';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('verify')
  async verifyUser(@Body() dto: LoginUserDto) {
    const user = await this.authService.authorization(dto);

    return fillObject(ResponseUserDto, user);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.authorization(dto);
    return await this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id', CheckMongoidValidationPipe) id: string , @Req() req: ExtendedUserRequest) {
    const existUser = await this.authService.getUser(id);
    return existUser;
  }

  @Post('refresh')
  async refreshTokens(@Body() dto: RefreshTokenDto) {
    return await this.authService.refreshToken(dto);
  }
}


