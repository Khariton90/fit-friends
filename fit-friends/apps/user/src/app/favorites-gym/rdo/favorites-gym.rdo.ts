import { Expose } from "class-transformer";

export class FavoritesGymRdo {
  @Expose()
  favorite: string[]
}