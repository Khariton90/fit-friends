import { FriendsService } from './../friends/friends.service';
import { FavoritesGymService } from './../favorites-gym/favorites-gym.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonalAccountService {
  constructor(
    private readonly favoritesGymService: FavoritesGymService,
    private readonly friendsService: FriendsService
  ) {}

  public async findFavoritesGymList(userId: string) {
    return await this.favoritesGymService.find(userId);
  }

  public async findFriendsList(userId: string) {
    return await this.friendsService.findAll(userId);
  }
}
