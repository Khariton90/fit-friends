import { Gender } from './gender.enum';
import { UserRole } from './user-role.enum';

export interface User {
  _id?: string;
  username: string;
  email: string;
  avatar: string;
  passwordHash: string;
  gender: Gender;
  dateBirth: Date;
  role: UserRole;
  location: string;
  createdAt: Date;
}