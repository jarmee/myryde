import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Car } from 'src/app/shared/car.model';
import { MockDataService } from 'src/app/shared/mock-data.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { User } from '../user.model';
import { CarService } from 'src/app/shared/services/car.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private service: MockDataService,
    private carService: CarService,
    private userService: UserService
  ) { }

  getCarToVote(blacklist: string[]): Observable<Car> {
    return this.carService.getAll().pipe(
      map(cars => {
        const filteredCars = cars.filter(car => {
          return !blacklist.includes(car.id);
        });

        if (filteredCars.length === 0) {
          console.warn('already Voted for all cars. No fallbacklogic implemented yet');
          return cars;
        }
        return filteredCars;

      }),
      map(cars => {
        return cars[Math.ceil(Math.random() * cars.length - 1)];
      })
    );
  }

  getTopUsers(): Observable<User[]> {
    return this.userService.getTopUsers();
  }

  getUserById(id: string): Observable<User> {
    return this.userService.getById(id);
  }

  getCarByUserId(userId: string): Observable<Car> {
    return this.carService.getByUserId(userId);
  }

  updateUser(user: User): Observable<void> {
    return this.userService.update(user);
  }

  updateCar(car: Car): Observable<void> {
    return this.carService.update(car);
  }
}
