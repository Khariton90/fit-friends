import { Friends } from "@fit-friends/shared-types";

export class FriendsEntity implements Friends {
  public _id?: string;
  public user: string;
  public friends: string[];
  
  constructor(friends: Friends) {
    this.fillObject(friends)
  }

  public toObject() {
    return {...this}
  }

  public fillObject(friends: Friends) {
    this._id = friends._id;
    this.user = friends.user;
    this.friends = friends.friends;
  }
}