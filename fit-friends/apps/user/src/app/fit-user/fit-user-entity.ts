import { Gender, User, UserRole, Location } from '@fit-friends/shared-types';
import { genSalt, compare, hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export class FitUserEntity implements User {
  public _id: string;
  public username: string;
  public email: string;
  public avatar: string;
  public passwordHash: string;
  public gender: Gender;
  public dateBirth: Date;
  public role: UserRole;
  public location: Location;
  public createdAt: Date;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return {...this};
  }

  public async setPassword(password: string): Promise<FitUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public fillEntity(fitUser: User) {
    this._id = fitUser._id;
    this.username = fitUser.username;
    this.email = fitUser.email;
    this.avatar = fitUser.avatar;
    this.passwordHash = fitUser.passwordHash;
    this.gender = fitUser.gender;
    this.dateBirth = fitUser.dateBirth;
    this.role = fitUser.role;
    this.location = fitUser.location;
    this.createdAt = fitUser.createdAt;
  }
}