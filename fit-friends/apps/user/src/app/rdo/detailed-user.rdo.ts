import { Gender, UserRole } from "@fit-friends/shared-types";
import { Expose } from "class-transformer";

export class DetailedUserRdo {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  avatar: string;

  @Expose()
  password: string;

  @Expose()
  gender: Gender;

  @Expose()
  dateBirth: Date;

  @Expose()
  role: UserRole;

  @Expose()
  location: Location;

  @Expose()
  question: {
    trainLevel?: string;
    typesTraining?: [];
    timeTraining?: number;
    resetCalories?: number;
    spendCaloriesPerDay?: number;
    readTrainig?: boolean;
    sertificates?: string;
    merits?: string;
    personalTraining?: boolean;
  }
}