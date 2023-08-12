import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/car.interface';
import { CarIsRented } from 'src/app/interfaces/car.isRented.enum';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css'],
})
export class CarsListComponent {
  @Input()
  resetCarOne: Car[] = [];
  @Input()
  cars_list: Car[] = [];

  @Input()
  rentedCarsOne: Car[] = [];
  @Input()
  availableCarsOne: Car[] = [];

  @Output() carIdToRent = new EventEmitter<number>();
  @Output() carIdToReturn = new EventEmitter<number>();

  private _GREEN = 'lightgreen';

  availableColor = (cars: Car) => {
    if (cars.isRented === CarIsRented.NOR_RENTED) {
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

  onAvailableCars = (filteredCars: Car[]) => {
    this.cars_list = filteredCars;
  };
  onRentedCars = (filteredCars: Car[]) => {
    this.cars_list = filteredCars;
  };
  onResetCars = (resetCars: Car[]) => {
    this.cars_list = resetCars;
  };
}
