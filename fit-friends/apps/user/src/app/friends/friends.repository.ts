import { CRUDRepository } from "@fit-friends/core";
import { FriendsEntity } from "./friends.entity";
import { Friends } from "@fit-friends/shared-types";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FriendsModel } from "./friends.model";
import { Model } from "mongoose";
import { UserModel } from "../fit-user/fit-user.model";

@Injectable()
export class FriendsRepository implements CRUDRepository<FriendsEntity, string, Friends> {
  constructor(
    @InjectModel(FriendsModel.name) private readonly friendsModel: Model<FriendsModel>,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  public async findById(id: string): Promise<Friends> {
    const friends = await this.friendsModel.findOne({user: id}).populate({ path: 'friends', model: this.userModel}).exec();
    return friends;
  }

  public async findFriend(userId: string, friendId: string) {
    const existFriend = await this.friendsModel.findOne({user: userId, friends: {$in: friendId}}).exec();
    return existFriend;
  }

  public async create(item: FriendsEntity): Promise<Friends> {
    const friends = new this.friendsModel(item);
    return friends.save();
  }

  public async update(id: string, item: FriendsEntity): Promise<Friends> {
    const updateFriends = await this.friendsModel.findOneAndUpdate({user: id}, item, {new: true}).populate({ path: 'friends', model: this.userModel});
    return updateFriends;
  }

  public async destroy(id: string): Promise<void> {
    await this.friendsModel.findByIdAndDelete({user: id});
  }
}