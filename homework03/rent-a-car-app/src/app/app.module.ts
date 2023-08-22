import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { FilterOptionsComponent } from './components/filter-options/filter-options.component';
import { SortPipePipe } from './pipes/sort-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { RentACarService } from './services/rent-a-car.service';

@NgModule({
  declarations: [
    AppComponent,
    CarsListComponent,
    FilterOptionsComponent,
    SortPipePipe,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [RentACarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
