import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Car } from 'src/app/interfaces/car.interface';
import { RentACarService } from 'src/app/services/rent-a-car.service';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css'],
})
export class FilterOptionsComponent implements OnInit {
  selectedAvailableCars: Car[] = [];
  selectRentedCars: Car[] = [];
  cars: Car[] = [];
  constructor(
    private readonly carsService: RentACarService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.carsService._availableCars.subscribe((data) => {
      this.selectedAvailableCars = data;
      console.log(data, 'data');
      // this.cdr.detectChanges();
    });
    this.carsService._rentedCars.subscribe((data) => {
      this.selectRentedCars = data;
      console.log(data, 'data');
      // this.cdr.detectChanges();
    });
  }
  filterAvailableCars = () => {
    this.carsService.onAvailableCars();
  };

  filterRentedCars = () => {
    this.carsService.onRentedCars();
  };

  resetCars = () => {};

  sortByFunction = () => {};
}
