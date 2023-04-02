import { Gym, GymParameters, Location } from "@fit-friends/shared-types";

export class GymEntity implements Gym {
  public _id?: string;
  public title: string;
  public location: Location;
  public verify: boolean;
  public parameters: GymParameters[];
  public photos: string[];
  public description: string;
  public price: number;

  constructor(gym: Gym) {
    this.fillEntity(gym);
  }
  
  public fillEntity(gym: Gym) {
    this.title = gym.title;
    this.location = gym.location;
    this.verify = gym.verify;
    this.parameters = gym.parameters;
    this.photos = gym.photos;
    this.description = gym.description;
    this.price = gym.price;
  }

  public toObject() {
    return {...this};
  }
}