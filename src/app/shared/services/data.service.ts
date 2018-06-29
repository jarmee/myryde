import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Car } from 'src/app/shared/car.model';
import { MockDataService } from 'src/app/shared/mock-data.service';
import { switchMap } from 'rxjs/operators';
import {User} from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private service: MockDataService) { }

  getCarToVote(): Observable<Car> {
    return this.service.getCarToVote();
  }

  getTopUsers(): Observable<User[]> {
    return timer(500).pipe(
      switchMap(() => this.service.getUsersByRankRange(1, 10))
    );
  }

  getUserById(id: string): Observable<User> {
    return this.service.getUser();
  }
}
