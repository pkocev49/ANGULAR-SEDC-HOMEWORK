import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/car.interface';
import { CarIsRented } from 'src/app/interfaces/car.isRented.enum';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css'],
})
export class CarsListComponent implements OnInit {
  noAvailableCars: boolean = false;
  available: boolean = false;

  @Input()
  cars_list: Car[] = [];
  @Input()
  filtered_cars: Car[] = [];
  @Input()
  cars_list_two: Car[] = [];

  model: 'asc' | 'desc' = 'asc';
  // initializing the originalArray property with a copy of the cars_list input array
  // by using the spread operator [...this.cars_list] to create a new array with the same elements as cars_list.
  ngOnInit() {
    this.cars_list_two = [...this.cars_list];
  }

  @Output() carIdToRent = new EventEmitter<number>();
  @Output() carIdToReturn = new EventEmitter<number>();

  private _GREEN = 'lightgreen';

  availableColor = (cars: Car) => {
    if (cars.isRented === CarIsRented.NOT_RENTED) {
      return { color: this._GREEN };
    }

    return { color: 'inherit' };
  };

  rentCar = (carId: number) => {
    this.carIdToRent.emit(carId);
  };

  returnCar = (carId: number) => {
    this.carIdToReturn.emit(carId);
  };

  onAvailableCars = () => {
    // FILTERING THE CARS THAT ARE AVAILABLE FOR RENT
    this.filtered_cars = this.cars_list_two.filter(
      (car) => car.isRented === CarIsRented.NOT_RENTED
    );
    this.noAvailableCars = this.filtered_cars.length === 0;
    this.available = false;

    this.cars_list = this.filtered_cars;
    console.log(this.filtered_cars, 'available cars');
  };
  onRentedCars = () => {
    this.filtered_cars = this.cars_list_two.filter(
      (car) => car.isRented === CarIsRented.IS_RENTED
    );
    this.noAvailableCars = false;
    this.available = this.filtered_cars.length === 0;

    this.cars_list = this.filtered_cars;
    console.log(this.filtered_cars, 'rented cars');
  };
  onResetCars = () => {
    // RESETTING THE CARS
    this.cars_list = this.cars_list_two;
    this.noAvailableCars = false;
    this.available = false;
  };

  //-------------------------------//
}
