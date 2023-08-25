import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  welcomeMessage = 'Hello this is my Order App';
  messageTwo = 'This is the bes Order App on the market';
}
