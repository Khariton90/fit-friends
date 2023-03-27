import { Exclude, Expose } from "class-transformer";

export class CoachQuestionnareRdo {
  @Exclude()
  userId: string;

  @Expose()
  trainLevel: string;

  @Expose()
  typesTraining: [];

  @Expose()
  sertificates: string;

  @Expose()
  merits: string;

  @Expose()
  personalTraining: boolean;
}