import { Component } from '@angular/core';
import { Car } from './interfaces/car.interface';
import { CarIsRented } from './interfaces/car.isRented.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rent-a-car-app';

  header = 'Welcome to the best Rent A Car App';
  subHeader = 'Whe provide the best user experience in the industry';

  cars: Car[] = [
    {
      id: 1,
      model: 'BMW G20 330i',
      engineType: '2.0l inline 4 254bhp ',
      yearOfProduction: '2019',
      priceToRent: 70,
      image:
        'https://paultan.org/image/2019/05/G20-BMW-3-Series-330i-M-Sport_Ext-2.jpg',
      isRented: CarIsRented.IS_RENTED,
    },
    {
      id: 2,
      model: 'Audi A5 45TFSI',
      engineType: '2.0l inline 4 245bhp ',
      yearOfProduction: '2019',
      priceToRent: 90,
      image: 'https://www.auto-data.net/images/f29/file7503984.jpg',
      isRented: CarIsRented.NOR_RENTED,
    },
    {
      id: 3,
      model: 'Mercedes W213 E-Class E300',
      engineType: '2.0l inline 4 258bhp ',
      yearOfProduction: '2021',
      priceToRent: 110,
      image:
        'https://images.wapcar.my/file1/9acfb914481640e293cd42204fe9f3b4_1200.jpg',
      isRented: CarIsRented.NOR_RENTED,
    },
    {
      id: 4,
      model: 'BWM G30 540I',
      engineType: '3.0l inline 6 340bhp ',
      yearOfProduction: '2017',
      priceToRent: 140,
      image: 'https://www.auto-data.net/images/f19/file5341705.jpg',
      isRented: CarIsRented.IS_RENTED,
    },
  ];
  onRentCar = (carId: number) => {
    this.cars = this.cars.map((car) => {
      if (car.id === carId && car.isRented === CarIsRented.NOR_RENTED) {
        return {
          ...car,
          isRented: CarIsRented.IS_RENTED,
        };
      }
      return car;
    });
  };
  onReturnCar = (carId: number) => {
    this.cars = this.cars.map((car) => {
      if (car.id === carId && car.isRented === CarIsRented.IS_RENTED) {
        return {
          ...car,
          isRented: CarIsRented.NOR_RENTED,
        };
      }
      return car;
    });
  };
}
