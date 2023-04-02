import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class OrderQuery {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public price: -1 | 1;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public quantity: -1 | 1;
}