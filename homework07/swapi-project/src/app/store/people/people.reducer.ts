import { createReducer, on } from '@ngrx/store';

import { Person } from 'src/app/interfaces/person.interface';
import { fetchPeopleSuccess } from './people.actions';

export interface PeopleState {
  people: Person[];
}

export const initialState: PeopleState = {
  people: [],
};

export const peopleReducer = createReducer(
  initialState,
  on(fetchPeopleSuccess, (state, payload) => {
    return {
      ...state,
      people: payload.people,
    };
  })
);
