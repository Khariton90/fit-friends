import {IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CommentQuery {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public skip: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public date: -1 | 1;
}