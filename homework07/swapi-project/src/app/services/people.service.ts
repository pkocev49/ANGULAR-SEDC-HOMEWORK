import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../interfaces/person.interface';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private readonly URL = 'https://swapi.dev/api/people';
  constructor(private readonly http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<any>(this.URL).pipe(map((res: any) => res.results));
  }
}
