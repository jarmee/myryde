import { Component, OnInit } from '@angular/core';
import {Observable, timer} from 'rxjs';
import {User} from '../shared/user.model';
import {mapTo, tap} from 'rxjs/operators';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  topUsers$: Observable<User[]>;

  constructor() { }

  ngOnInit() {
    this.topUsers$ = timer(1000).pipe(
      mapTo([
        { name: 'Natalio', picture: 'https://avatars-01.gitter.im/gh/uv/4/nsacerdote?s=256',
          location: 'LPA', gender: 'male', id : '1' },
        { name: 'Natalio', picture: 'https://avatars-01.gitter.im/gh/uv/4/nsacerdote?s=256',
          location: 'LPA', gender: 'male', id : '2' },
        { name: 'Natalio', picture: 'https://avatars-01.gitter.im/gh/uv/4/nsacerdote?s=256',
          location: 'LPA', gender: 'male', id : '3' },
        { name: 'Natalio', picture: 'https://avatars-01.gitter.im/gh/uv/4/nsacerdote?s=256',
          location: 'LPA', gender: 'male', id : '4' }
      ]),
      tap(console.log)
    );
  }

}
