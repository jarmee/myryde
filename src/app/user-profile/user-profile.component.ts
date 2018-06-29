import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';
import { tap } from 'rxjs/operators';
import { Car } from '../shared/car.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  readOnly: boolean;

  user$: Observable<User>;
  car$: Observable<Car>;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.readOnly = !!data.readOnly;
      });
    this.user$ = this.dataService.getUserById('1').pipe(
      tap(() => { this.car$ = this.dataService.getCarToVote(); })
    );
  }

}
