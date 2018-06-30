import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/car.model';
import { DataService } from 'src/app/shared/services/data.service';
import { User } from 'src/app/shared/user.model';
import { withLatestFrom, concatMap, map } from 'rxjs/operators';
import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  animations: [
    trigger('swipeAnimation', [

      state('idle', style({
        opacity: 1,
        left: '0px', top: '0px', transform: 'rotate(0deg)'
      })),
      state('right', style({
        opacity: 0, left: '-400px', top: '80px', transform: 'rotate(-15deg)'
      })),
      state('left', style({
        opacity: 0, left: '400px', top: '80px', transform: 'rotate(15deg)'
      })),
      transition('idle => right', animate(200, keyframes([
        style({ opacity: 0, left: '400px', top: '80px', transform: 'rotate(15deg)', offset: 1 }),
      ]))),
      transition('idle => left', animate(200, keyframes([
        style({ opacity: 0, left: '-400px', top: '80px', transform: 'rotate(-15deg)', offset: 1 }),
      ]))),
      transition('right => idle, left => idle', animate(200))
    ])
  ]
})
export class VoteComponent implements OnInit {

  car: Car;
  user: User;

  swipeAnimation = 'idle';

  constructor(private service: DataService) { }

  onAnimationEnd(event: any) {
  }

  ngOnInit() {
    this.fetchRandom();
  }

  onSwipe(event) {
    // if (this.swipeAnimation === 'idle') {
    // this.swipeAnimation = 'right';
    this.fetchRandom();
    // }
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
        this.car = <Car>car;
        this.user = <User>user;
      });
  }

}
