import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/car.model';
import { DataService } from 'src/app/shared/services/data.service';
import { User } from 'src/app/shared/user.model';
import { withLatestFrom, concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  car: Car;
  user: User;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.fetchRandom();
  }

  upVote() {
    this.fetchRandom();
  }

  downVote() {
    this.fetchRandom();
  }

  fetchRandom() {
    this.service.getCarToVote()
    .pipe(
      concatMap((car: Car) => this.service.getUserById(car.id)
                                          .pipe(map(user => [car, user])))
    ).subscribe(([car, user]) => {
      this.car = <Car> car;
      this.user = <User> user;
    });
  }

}
