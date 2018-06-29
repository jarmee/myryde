import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/car.model';
import { MockDataService } from 'src/app/shared/mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private service: MockDataService) { }

  getCarToVote(): Observable<Car> {
    return this.service.getCarToVote();
  }
}
