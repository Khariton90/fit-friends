import { CRUDRepository } from "@fit-friends/core";
import { FavoritesGymEntity } from "./favorites-gym.entity";
import { FavoritesGym } from "@fit-friends/shared-types";
import { InjectModel } from "@nestjs/mongoose";
import { FavoritesGymModel } from "./favorites-gym.model";
import { Model } from "mongoose";
import { AddFavoriteGymDto } from "./dto/add-favorite-gym.dto";

export class FavoritesGymRepository implements CRUDRepository<FavoritesGymEntity, string, FavoritesGym> {
  constructor(
    @InjectModel(FavoritesGymModel.name) private readonly favoriteGymModel: Model<FavoritesGymModel>
  ) {}

  public async findById(id: string): Promise<FavoritesGym> {
    const favorites = await this.favoriteGymModel.findOne({user: id}).exec();
    return favorites;
  }

  public async findGym(dto: AddFavoriteGymDto): Promise<FavoritesGym> {
    const favorites = await this.favoriteGymModel.findOne({user: dto.user, favorite: {$in: dto.gym}}).exec();
    return favorites;
  }

  public async create(item: FavoritesGymEntity): Promise<FavoritesGym> {
    const newFavoritesGym = new this.favoriteGymModel(item);
    return newFavoritesGym.save();
  }

  public async update(id: string, item: FavoritesGymEntity): Promise<FavoritesGym> {
    const updateFavoritesGym = await this.favoriteGymModel.findOneAndUpdate({user: id}, item, {new: true});
    return updateFavoritesGym;
  }

  public async destroy(id: string): Promise<void> {
    await this.favoriteGymModel.findOne({user: id});
  }

}