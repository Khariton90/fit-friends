import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

const USERNAME_EMAIL = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      usernameField: USERNAME_EMAIL
    });
  }

  public async validate(email: string, password: string) {
    return this.authService.authorization({ email, password });
  }
}