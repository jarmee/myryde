import { Injectable } from '@angular/core';
import {Observable, timer} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {User} from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }


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
