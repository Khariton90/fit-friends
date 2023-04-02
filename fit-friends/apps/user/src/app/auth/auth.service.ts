import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FitUserEntity } from '../fit-user/fit-user-entity';
import { User } from '@fit-friends/shared-types';
import { AuthRepository } from './auth.repository';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { FitUserService } from '../fit-user/fit-user.service';
import { jwtOptions } from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly fitUserService: FitUserService,
    private readonly jwtService: JwtService,
    @Inject (jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>,
  ) {}

  async authorization(dto: LoginUserDto): Promise<User | null> {
    const existUser = await this.fitUserService.findByEmail(dto.email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${dto.email} was not found`)
    }

    const validPassword = await new FitUserEntity(existUser).comparePassword(dto.password);

    if (!validPassword) {
      throw new BadRequestException('Incorrect password')
    }

    return existUser;
  }

  async login(user: User) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    }

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      { 
        secret: this.jwtConfig.refreshSecret,
        expiresIn: this.jwtConfig.refreshSecretTime
      }
    )

    await this.authRepository.create({ 
      userId: user._id, 
      refreshToken 
    });

    return {
      id: payload.sub,
      email: payload.email,
      accessToken
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    const userSub = await this.retrieveRefreshToken(dto.refreshToken);

    if (!userSub) {
      return undefined;
    }

    const token = await this.authRepository.find(userSub);

    if (!token) {
      return undefined
    }

    const user = await this.fitUserService.findById(userSub);
    const payload = {
      sub: user.id,
      email: user.email,
    }
    const accessToken = await this.jwtService.signAsync(payload);
    
    return {
      id: payload.sub,
      email: payload.email,
      accessToken
    };
  }

  async retrieveRefreshToken(refreshToken: string): Promise<string | undefined> {
    try {
      const { sub } = await this.jwtService.verifyAsync(refreshToken);
      return sub;
    } catch (error) {
      return undefined;
    }
  }

  async getUser(id: string) {
    const existUser = await this.fitUserService.findById(id);
    return existUser;
  }
}
