import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';
import { tap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Car } from '../shared/car.model';
import { CarService } from '../shared/services/car.service';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  readOnly: boolean;

  user$: Observable<User>;
  car$: Observable<Car>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.readOnly = !!data.readOnly;
      });
    this.user$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap(id => this.dataService.getUserById(id))
    );
    this.car$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap(id => this.dataService.getCarByUserId(id))
    );
  }

  logout() {
    this.authService.signOut().then(
      () => this.router.navigate['/login']
    )
  }
}
