import { EventEmitter, Injectable } from '@angular/core';
import { Car } from '../interfaces/car.interface';
import { CARS_DATA } from '../data/cars.data';
import { CarIsRented } from '../interfaces/car.isRented.enum';

@Injectable({
  providedIn: 'root',
})
export class RentACarService {
  // Initialize the car data using CARS_DATA constant
  cars: Car[] = CARS_DATA;

  // Define a constant color for available cars
  private _GREEN = 'lightgreen';

  // Define EventEmitter instances for communication with components
  _selectedCars = new EventEmitter<Car>();
  _cars = new EventEmitter<Car[]>();

  // Simulate an API call or asynchronous operation to get data
  // For demonstration purposes, directly assigning CARS_DATA here

  // Get all cars from the service
  getAllCars = () => {
    return this.cars;
  };

  // Determine the color of a car based on its availability
  availableColor = (car: Car) => {
    if (car.isRented === CarIsRented.NOT_RENTED) {
      return { color: this._GREEN }; // Return green color
    }
    return { color: 'inherit' }; // Return default color
  };

  // Rent a car by changing its availability status
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
    // Emit the updated car list to components
    this._cars.emit(this.cars);
  };

  // Return a rented car by changing its availability status
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
    // Emit the updated car list to components
    this._cars.emit(this.cars);
  };

  // Filter and emit available cars
  onAvailableCars = () => {
    const filteredCars = this.cars.filter(
      (car) => car.isRented === CarIsRented.NOT_RENTED
    );
    // Emit the filtered car list to components
    this._cars.emit(filteredCars);
  };

  // Filter and emit rented cars
  onRentedCars = () => {
    const filteredCars = this.cars.filter(
      (car) => car.isRented === CarIsRented.IS_RENTED
    );
    // Emit the filtered car list to components
    this._cars.emit(filteredCars);
  };

  // Reset filters and emit the original car list
  onResetFilters = () => {
    this._cars.emit(this.cars);
  };
}
