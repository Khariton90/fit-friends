import { DEFAULT_QUERY_LIMIT } from "@fit-friends/core";
import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class OrderQuery {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public limit = DEFAULT_QUERY_LIMIT;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public price: -1 | 1;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public quantity: -1 | 1;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public skip: number;
}