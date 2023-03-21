import { FitUserRepository } from './../fit-user/fit-user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/login-user.dto';
import { FitUserEntity } from '../fit-user/fit-user-entity';
import { User } from '@fit-friends/shared-types';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) {}

  async authorization(dto: LoginUserDto): Promise<User | null> {
    const existUser = await this.fitUserRepository.findByEmail(dto.email);

    if (!existUser) {
      throw new UnauthorizedException();
    }

    const validPassword = await new FitUserEntity(existUser).comparePassword(dto.password);

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    return existUser;
  }

  async login(user: User) {
    const payload = {
      sub: user._id.toString(),
      email: user.email
    }

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      { expiresIn: '7d' }
    )

    await this.authRepository.create({ 
      userId: user._id, 
      refreshToken 
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async refreshToken(refreshStr: string) {
    const userSub = await this.retrieveRefreshToken(refreshStr);
    if (!userSub) {
      return undefined;
    }

    const user = await this.fitUserRepository.findById(userSub);

    if (!user) {
      return undefined
    }

    const payload = {
      sub: user._id,
      email: user.email,
    }

    const accessToken = await this.jwtService.signAsync(payload);
    const existUser = {
      id: user._id, 
      email: user.email, 
      username: user.username, 
      token: accessToken 
    };
    return existUser;
  }

  async retrieveRefreshToken(refreshToken: string): Promise<string | undefined> {
    try {
      const { sub } = await this.jwtService.verifyAsync(refreshToken);
      return sub;
    } catch (e) {
      return undefined;
    }
  }
}
