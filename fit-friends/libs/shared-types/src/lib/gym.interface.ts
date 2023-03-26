import { GymParameters } from "./gym-parameters.enum";

export interface Gym {
  _id?: string;
  title: string;
  location: string;
  verify: boolean;
  parameters: GymParameters[];
  photos: string[];
  description: string;
  price: number;
  createdAt: Date;
}