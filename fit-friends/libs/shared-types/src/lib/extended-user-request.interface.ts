import { Request } from '@nestjs/common/decorators';
import { UserRole } from './user-role.enum';

export interface UserRequest {
  sub: string;
  email: string;
  role: UserRole;
}

export interface ExtendedUserRequest extends Request {
  user: UserRequest;
}