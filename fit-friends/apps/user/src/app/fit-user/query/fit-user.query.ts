import {IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FitUserQuery {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public skip: number;
}