import { EventEmitter, Injectable } from '@angular/core';
import { Car } from '../interfaces/car.interface';
import { CARS_DATA } from '../data/cars.data';
import { CarIsRented } from '../interfaces/car.isRented.enum';

@Injectable({
  providedIn: 'root',
})
export class RentACarService {
  cars: Car[] = CARS_DATA;
  cars_list_two: Car[] = [...this.cars];
  filtered_cars: Car[] = [];

  private _GREEN = 'lightgreen';
  _selectedCars = new EventEmitter<Car>();
  _availableCars = new EventEmitter<Car[]>();
  _rentedCars = new EventEmitter<Car[]>();

  // Simulate an API call or any asynchronous operation to get data
  // For demonstration purposes, directly assigning CARS_DATA here

  getAllCars = () => {
    return this.cars;
  };

  availableColor = (cars: Car) => {
    if (cars.isRented === CarIsRented.NOT_RENTED) {
      return { color: this._GREEN };
    }

    return { color: 'inherit' };
  };
  onRentCarFromService = (carId: number) => {
    this.cars = this.cars.map((car) => {
      if (car.id === carId && car.isRented === CarIsRented.NOT_RENTED) {
        return {
          ...car,
          isRented: CarIsRented.IS_RENTED,
        };
      }
      return car;
    });
  };
  onReturnCarFromService = (carId: number) => {
    this.cars = this.cars.map((car) => {
      if (car.id === carId && car.isRented === CarIsRented.IS_RENTED) {
        return {
          ...car,
          isRented: CarIsRented.NOT_RENTED,
        };
      }
      return car;
    });
  };

  onAvailableCars = () => {
    this.filtered_cars = this.cars_list_two.filter(
      (car) => car.isRented === CarIsRented.NOT_RENTED
    );

    this._availableCars.emit(this.cars_list_two);
    this.cars = this.filtered_cars;
  };
  onRentedCars = () => {
    this.filtered_cars = this.cars_list_two.filter(
      (car) => car.isRented === CarIsRented.IS_RENTED
    );

    this._rentedCars.emit(this.cars_list_two);
    this.cars = this.filtered_cars;
  };
}
