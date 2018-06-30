import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, merge, combineLatest, Subscription } from 'rxjs';
import { Car } from 'src/app/shared/car.model';
import { DataService } from 'src/app/shared/services/data.service';
import { User } from 'src/app/shared/user.model';
import { withLatestFrom, concatMap, map, tap, switchMap, first, skip } from 'rxjs/operators';
import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';
import { VoteService } from '../shared/services/vote.service';
import { AuthService } from '../shared/services/auth.service';
import { VoteType, Vote } from '../shared/vote.model';

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

  _usercar$: Subscription;

  constructor(private service: DataService, private voteService: VoteService, private authService: AuthService) { }

  onAnimationEnd(event: any) {
  }

  ngOnInit() {
    this.fetchRandom();
  }

  upVote(car) {
    this.voteService.createNewVote(this.authService.loggedInUserId, car, VoteType.Up).subscribe(() => {
      this.fetchRandom();
    });

  }

  downVote(car) {
    this.voteService.createNewVote(this.authService.loggedInUserId, car, VoteType.Down).subscribe(() => {
      this.fetchRandom();
    });

  }

  fetchRandom() {
    if (this._usercar$) {
      this._usercar$.unsubscribe();
    }

    this._usercar$ = combineLatest(
      this.voteService.getMyVotes().pipe(
        map(votes => votes.map(vote => vote.carId))
      ),
      this.service.getCarByUserId(this.authService.loggedInUserId).pipe(
        map(car => car.id)
      )
    ).pipe(
      map(([arr, singleVal]) => [...arr, singleVal]),
      switchMap(blacklist => {
        return this.service.getCarToVote(blacklist).pipe(
          skip(1),
          first(),
          concatMap((car: Car) => this.service.getUserById(car.id)
            .pipe(map(user => [car, user]))),
        );
      }),
      first()
    ).subscribe(([car, user]) => {

      this.car = car as Car;
      this.user = user as User;
    });

  }
}
