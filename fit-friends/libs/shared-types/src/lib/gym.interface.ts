import { GymParameters } from "./gym-parameters.enum";
import { Location } from "./location.enum";

export interface Gym {
  _id?: string;
  title: string;
  location: Location;
  verify: boolean;
  parameters: GymParameters[];
  photos: string[];
  description: string;
  price: number;
}