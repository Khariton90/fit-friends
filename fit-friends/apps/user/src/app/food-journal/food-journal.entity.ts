import { Eating, FoodJournal } from "@fit-friends/shared-types";


export class FoodJournalEntity implements FoodJournal {
  public user: string;
  public calories: number;
  public date: Date;
  public eating: Eating;
  
  constructor(foodJournal: FoodJournal) {
    this.fillObject(foodJournal);
  }

  public toObject() {
    return {...this}
  }

  public fillObject({user, calories, date, eating}: FoodJournal) {
    this.user = user;
    this.calories = calories;
    this.date = date;
    this.eating = eating;
  }
}