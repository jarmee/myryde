import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Car } from 'src/app/shared/car.model';

export const ENDPOINT_URL = new InjectionToken<string>('endpointUrl');

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor(
    private http: HttpClient,
    @Inject(ENDPOINT_URL) private endPointUrl: string
  ) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.endPointUrl}/car-data.json`);
  }

  getCarToVote(): Observable<Car> {
    return this.getCars().pipe(
      map((cars) => cars[Math.ceil(Math.random() * cars.length - 1)])
    );
  }
}
