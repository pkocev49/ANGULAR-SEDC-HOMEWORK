import { AppState } from './app.state';

export const selectPeople = (state: AppState) => state.people.people;
