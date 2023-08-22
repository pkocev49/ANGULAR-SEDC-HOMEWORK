import { CarIsRented } from './car.isRented.enum';

export interface Car {
  id: number;
  model: string;
  engineType: string;
  yearOfProduction: string;
  priceToRent: number;
  image: string;
  isRented: CarIsRented;
}
