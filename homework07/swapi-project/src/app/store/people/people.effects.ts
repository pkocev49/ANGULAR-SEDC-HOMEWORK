import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as PeopleActions from './people.actions';
import { PeopleService } from 'src/app/services/people.service';
import { switchMap, map } from 'rxjs';

@Injectable()
export class PeopleEffects {
  constructor(
    private readonly action$: Actions,
    private readonly peopleService: PeopleService
  ) {}

  fetchPeopl$ = createEffect(() =>
    this.action$.pipe(
      ofType(PeopleActions.FETCH_PEOPLE),
      switchMap(() =>
        this.peopleService.getPeople().pipe(
          map((data) => {
            return PeopleActions.fetchPeopleSuccess({ people: data });
          })
        )
      )
    )
  );
}
