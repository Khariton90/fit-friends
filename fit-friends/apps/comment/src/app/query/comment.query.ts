import {IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { Query } from '@fit-friends/shared-types';
import { DEFAULT_QUERY_LIMIT } from '@fit-friends/core';

export class CommentQuery implements Query {
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