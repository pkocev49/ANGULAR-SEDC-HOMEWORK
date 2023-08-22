import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  DoCheck,
} from '@angular/core';
import { CARS_DATA } from 'src/app/data/cars.data';
import { Car } from 'src/app/interfaces/car.interface';
import { CarIsRented } from 'src/app/interfaces/car.isRented.enum';
import { RentACarService } from 'src/app/services/rent-a-car.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css'],
})
export class CarsListComponent implements DoCheck {
  @Input()
  cars: Car[] = [];
  selectedCarToRent: number | undefined;

  constructor(private readonly carsService: RentACarService) {}
  ngDoCheck(): void {
    this.cars = this.carsService.getAllCars();
    console.log('cars', this.cars);
  }

  model: 'asc' | 'desc' = 'asc';
  // initializing the originalArray property with a copy of the cars_list input array
  // by using the spread operator [...this.cars_list] to create a new array with the same elements as cars_list.

  onColorChange = (car: Car) => {
    return this.carsService.availableColor(car);
  };

  onRentCar = (carId: number) => {
    this.carsService.onRentCarFromService(carId);
  };
  onReturnCar = (carId: number) => {
    this.carsService.onReturnCarFromService(carId);
  };
  //-------------------------------//
}
