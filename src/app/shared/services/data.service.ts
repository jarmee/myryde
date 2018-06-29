import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Car } from 'src/app/shared/car.model';
import { MockDataService } from 'src/app/shared/mock-data.service';
import { switchMap, map } from 'rxjs/operators';
import {User} from '../user.model';
import { CarService } from 'src/app/shared/services/car.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private service: MockDataService, private carService: CarService) {

   }

  getCarToVote(): Observable<Car> {
    return this.carService.getAll().pipe(
      map(cars => cars[Math.ceil(Math.random() * cars.length - 1 )])
    );
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
