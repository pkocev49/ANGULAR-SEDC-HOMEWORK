import { Input, Pipe, PipeTransform } from '@angular/core';
import { Car } from '../interfaces/car.interface';

@Pipe({
  name: 'sortPipe',
})
export class SortPipePipe implements PipeTransform {
  cars: Car[] = [];

  transform(cars: Car[], model: 'asc' | 'desc' = 'asc'): Car[] {
    if (!model) {
      return cars;
    }

    return (cars = cars.sort((car1: Car, car2: Car) => {
      if (model === 'asc') {
        const comparison = car1.model.localeCompare(car2.model);
        return comparison;
      } else {
        const comparison = car2.model.localeCompare(car1.model);
        return comparison;
      }
    }));
  }
}
