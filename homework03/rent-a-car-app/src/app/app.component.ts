import { Component, Input } from '@angular/core';
import { Car } from './interfaces/car.interface';
import { CarIsRented } from './interfaces/car.isRented.enum';
import { RentACarService } from './services/rent-a-car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rent-a-car-app';

  header = 'Welcome to the best Rent A Car App';
  subHeader = 'Whe provide the best user experience in the industry';

  // onRentCar = (carId: number) => {
  //   this.cars = this.cars.map((car) => {
  //     if (car.id === carId && car.isRented === CarIsRented.NOT_RENTED) {
  //       return {
  //         ...car,
  //         isRented: CarIsRented.IS_RENTED,
  //       };
  //     }
  //     return car;
  //   });
  // };
  // onReturnCar = (carId: number) => {
  //   this.cars = this.cars.map((car) => {
  //     if (car.id === carId && car.isRented === CarIsRented.IS_RENTED) {
  //       return {
  //         ...car,
  //         isRented: CarIsRented.NOT_RENTED,
  //       };
  //     }
  //     return car;
  //   });
  // };
}
