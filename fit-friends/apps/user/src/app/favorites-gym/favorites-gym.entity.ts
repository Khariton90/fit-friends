import { FavoritesGym } from "@fit-friends/shared-types";

export class FavoritesGymEntity implements FavoritesGym {
  public _id?: string;
  public user: string;
  public favorite: string[];
  
  constructor(favoritesGym: FavoritesGym) {
    this.fillEntity(favoritesGym)
  }

  public toObject() {
    return {...this}
  }

  public fillEntity(favoritesGym: FavoritesGym) {
    this._id = favoritesGym._id;
    this.user = favoritesGym.user;
    this.favorite = favoritesGym.favorite;
  }
}