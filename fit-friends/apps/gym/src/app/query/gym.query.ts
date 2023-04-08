import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class GymQuery {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public skip: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public date: -1 | 1;
}