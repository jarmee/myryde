import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Car } from 'src/app/shared/car.model';
import { MockDataService } from 'src/app/shared/mock-data.service';
import {mapTo} from 'rxjs/operators';
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
    return timer(1000).pipe(
      mapTo([
        { name: 'Natalio', picture: 'https://avatars-01.gitter.im/gh/uv/4/nsacerdote?s=256',
          location: 'LPA', gender: 'male', id : '1' },
        { name: 'Natalio', picture: 'https://avatars-01.gitter.im/gh/uv/4/nsacerdote?s=256',
          location: 'LPA', gender: 'male', id : '2' },
        { name: 'Natalio', picture: 'https://avatars-01.gitter.im/gh/uv/4/nsacerdote?s=256',
          location: 'LPA', gender: 'male', id : '3' },
        { name: 'Natalio', picture: 'https://avatars-01.gitter.im/gh/uv/4/nsacerdote?s=256',
          location: 'LPA', gender: 'male', id : '4' }
      ])
    );
  }
}
