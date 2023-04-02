import { ConfigService, registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export const jwtOptions = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  secretTime: process.env.JWT_SECRET_TIME,
  refreshSecret: process.env.JWT_RT_SECRET,
  refreshSecretTime: process.env.JWT_RT_SECRET_TIME
}));

export async function getJwtConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.secret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.secretTime'),
      algorithm: 'HS256'
    }
  }
}