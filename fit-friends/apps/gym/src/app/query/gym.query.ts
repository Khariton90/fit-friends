import { DEFAULT_QUERY_LIMIT } from "@fit-friends/core";
import { Query } from "@fit-friends/shared-types";
import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class GymQuery implements Query {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public limit = DEFAULT_QUERY_LIMIT;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public skip: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public date: -1 | 1;
}