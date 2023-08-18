import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { FilterOptionsComponent } from './components/filter-options/filter-options.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CarsListComponent, FilterOptionsComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
