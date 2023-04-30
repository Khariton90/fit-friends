import { Eating } from "./eating.enum";

export interface FoodJournal {
  user: string;
  calories: number;
  date: Date;
  eating: Eating
}