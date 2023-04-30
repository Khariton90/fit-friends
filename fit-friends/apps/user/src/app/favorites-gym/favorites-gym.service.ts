import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoritesGymRepository } from './favorites-gym.repository';
import { AddFavoriteGymDto } from './dto/add-favorite-gym.dto';
import { FavoritesGymEntity } from './favorites-gym.entity';

@Injectable()
export class FavoritesGymService {
  constructor(
    private readonly favoritesGymRepository: FavoritesGymRepository
  ) { }

  public async find(userId: string) {
    const existFavorites = await this.favoritesGymRepository.findById(userId);

    if (!existFavorites) {
      throw new NotFoundException('This user did not find favorites gyms')
    }

    return existFavorites;
  }

  public async create(userId: string) {
    const existFavorites = await this.favoritesGymRepository.findById(userId);

    if (!existFavorites) {
      const favoritesEntity = new FavoritesGymEntity({user: userId, favorite: []});
      const favoritesGym = await this.favoritesGymRepository.create(favoritesEntity);
      return favoritesGym;
    }

    return existFavorites;
  }

  public async update(dto: AddFavoriteGymDto) {
    const existFavorites = await this.favoritesGymRepository.findGym(dto);
    if (existFavorites) {
      const favorites = existFavorites.favorite.filter((el) => el !== dto.gym);
      const entity = new FavoritesGymEntity({user: dto.user, favorite: favorites})

      return await this.favoritesGymRepository.update(dto.user, entity);
    }
    
      const favorites = await this.favoritesGymRepository.findById(dto.user);
      const entity = new FavoritesGymEntity({user: dto.user, favorite: [...favorites.favorite, dto.gym]});
      return await this.favoritesGymRepository.update(dto.user, entity);
  }
}
