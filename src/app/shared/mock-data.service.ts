import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from 'src/app/shared/car.model';
import {User} from './user.model';

export const ENDPOINT_URL = new InjectionToken<string>('endpointUrl');

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor(
    private http: HttpClient,
    @Inject(ENDPOINT_URL) private endPointUrl: string
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.endPointUrl}/user-data.json`);
  }

  getUser(): Observable<User> {
    return this.getUsers().pipe(
      map((users) => users[Math.ceil(Math.random() * users.length - 1)])
    );
  }

  getUsersByRankRange(fromRank = 1, toRank = 25): Observable<User[]> {
    return this.getUsers().pipe(
      map((users) => {
        if (toRank > users.length) {
          toRank = users.length;
        }
        return users.slice(fromRank - 1, toRank);
      })
    );
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.endPointUrl}/car-data.json`);
  }

  getCarToVote(): Observable<Car> {
    return this.getCars().pipe(
      map((cars) => cars[Math.ceil(Math.random() * cars.length - 1)])
    );
  }
}
