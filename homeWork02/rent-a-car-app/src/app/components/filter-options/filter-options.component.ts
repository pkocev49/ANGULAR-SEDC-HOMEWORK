import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css'],
})
export class FilterOptionsComponent {
  @Output() carsToRent = new EventEmitter<number>();
  @Output() carsToReturn = new EventEmitter<number>();
  @Output() reset = new EventEmitter<number>();
  @Output() sortOptionSelected = new EventEmitter();

  filterAvailableCars = () => {
    this.carsToRent.emit();
  };

  filterRentedCars = () => {
    this.carsToReturn.emit();
  };

  resetCars = () => {
    this.reset.emit();
  };

  sortByFunction = () => {
    this.sortOptionSelected.emit();
  };
}
