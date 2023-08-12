import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from 'src/app/interfaces/car.interface';
import { CarIsRented } from 'src/app/interfaces/car.isRented.enum';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css'],
})
export class FilterOptionsComponent {
  @Input()
  availableCars: Car[] = [];

  @Input()
  rentedCars: Car[] = [];

  @Input()
  resetCar: Car[] = [];

  // THIS IS THE BOOLEAN FOR THE MESSAGE
  //  THAT IS DISPLAYED IF THERE ARE NO AVAILABLE CARS FOR RENT
  noAvailableCars: boolean = false;
  // THIS IS THE BOOLEAN FOR THE MESSAGE
  //  THAT IS DISPLAYED IF ALL CARS ARE AVAILABLE FOR RENT
  available: boolean = false;

  @Output() carsToRent = new EventEmitter();
  @Output() carsToReturn = new EventEmitter();
  @Output() reset = new EventEmitter();

  filterAvailableCars = () => {
    // FILTERING THE CARS THAT ARE AVAILABLE FOR RENT
    const filteredCars = this.availableCars.filter(
      (car) => car.isRented === CarIsRented.NOR_RENTED
    );
    this.noAvailableCars = filteredCars.length === 0;
    // EMITTING THE CARS THAT ARE AVAILABLE FOR RENT
    this.carsToRent.emit(filteredCars);
    this.available = false;
  };

  filterRentedCars = () => {
    // FILTERING THE CARS THAT ARE NOT AVAILABLE FOR RENT

    const filteredCars = this.rentedCars.filter(
      (car) => car.isRented === CarIsRented.IS_RENTED
    );
    this.available = filteredCars.length === 0;
    // EMITTING THE CARS THAT ARE NOT AVAILABLE FOR RENT
    this.carsToReturn.emit(filteredCars);
  };

  resetCars = () => {
    // RESETTING THE CARS
    const resetCars = this.resetCar;
    this.reset.emit(resetCars); // Emit the resetCars event
    this.noAvailableCars = false;
    this.available = false;
  };
}
