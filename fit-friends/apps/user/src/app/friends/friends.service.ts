import { Injectable } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';
import { FriendsEntity } from './friends.entity';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepository: FriendsRepository
  ) {}

  public async create(userId: string) {
    const existFriends = await this.friendsRepository.findById(userId);

    if (!existFriends) {
      const friendsEntity = new FriendsEntity({user: userId, friends: []});
      const friends = await this.friendsRepository.create(friendsEntity);
      return friends;
    }

    return existFriends;
  }

  public async findAll(userId: string) {
    const friendsList = await this.friendsRepository.findById(userId);
    return friendsList;
  }

  public async addAndRemove(id: string, friendId: string) {
    const existFavorites = await this.friendsRepository.findFriend(id, friendId);
    if (existFavorites) {
      const friends = existFavorites.friends.filter((el) => el.toString() !== friendId);
      const entity = new FriendsEntity({user: id, friends: friends});
      return await this.friendsRepository.update(id, entity);
    } 

    const friends = await this.friendsRepository.findById(id);
    const entity = new FriendsEntity({user: id, friends: [...friends.friends, friendId]});
    return await this.friendsRepository.update(id, entity);
  }
}
