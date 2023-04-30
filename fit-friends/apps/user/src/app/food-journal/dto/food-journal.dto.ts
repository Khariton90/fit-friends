import { Eating } from "@fit-friends/shared-types";
import { IsEnum, IsNotEmpty } from 'class-validator';

export class FoodJournalDto {
  @IsNotEmpty()
  public calories: number;

  @IsNotEmpty()
  public date: Date;
  
  @IsNotEmpty()
  @IsEnum(Eating)
  public eating: Eating
}