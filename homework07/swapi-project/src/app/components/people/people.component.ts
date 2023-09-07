import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Person } from 'src/app/interfaces/person.interface';
import { AppState } from 'src/app/store/people/app.state';
import { fetchPeople } from 'src/app/store/people/people.actions';
import { selectPeople } from 'src/app/store/people/people.selectors';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  peopleData: Person[];
  constructor(private readonly store: Store<AppState>) {}
  ngOnInit() {
    this.store.dispatch(fetchPeople());
    this.store.select(selectPeople).subscribe((peopleFromStore) => {
      this.peopleData = peopleFromStore || [];
    });
  }
}
