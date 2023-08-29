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
export class FilterOptionsComponent {
  constructor(private readonly carsService: RentACarService) {}

  filterAvailableCars = () => {
    this.carsService.onAvailableCars();
  };

  filterRentedCars = () => {
    this.carsService.onRentedCars();
  };

  resetCars = () => {
    this.carsService.onResetFilters();
  };
}
