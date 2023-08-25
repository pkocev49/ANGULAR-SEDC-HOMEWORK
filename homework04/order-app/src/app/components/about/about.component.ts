import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  message =
    'Whe are the best on the market and whe provide the best user experience ';
  creator = 'Pavel Kocev';
}
