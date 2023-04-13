import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { CheckMongoidValidationPipe } from '@fit-friends/core';
import { LoginUserRdo } from './rdo/login-user.rdo';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { fillObject } from '@fit-friends/core';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiOperation({summary: 'Verify user'})
  @Post('verify')
  async verifyUser(@Body() dto: LoginUserDto) {
    const user = await this.authService.authorization(dto);
    return fillObject(LoginUserRdo, user);
  }

  @ApiOperation({summary: 'Login user'})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.authorization(dto);
    const authUser = await this.authService.login(user);
    return fillObject(LoginUserRdo, authUser);
  }

  @ApiOperation({summary: 'Authentication user on ID'})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id', CheckMongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser;
  }

  @ApiOperation({summary: 'Refresh token'})
  @Post('refresh')
  async refreshTokens(@Body() dto: RefreshTokenDto) {
    return await this.authService.refreshToken(dto);
  }
}


