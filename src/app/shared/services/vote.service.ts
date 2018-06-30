import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Vote, VoteType } from '../vote.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Car } from '../car.model';
import { User } from '../user.model';
import { Observable, from } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap, mergeMap, reduce, map, tap, toArray, scan, filter, distinctUntilKeyChanged } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService extends BaseService<Vote> {

  constructor(private store: AngularFirestore, private authService: AuthService, private userService: UserService) {
    super('/votes', store);
  }

  createNewVote(user: User, car: Car, vote: VoteType): Observable<void> {
    const toCreate = ({ userId: user.id, carId: car.id, type: vote, timestamp: Date.now() });
    return super.createWithId(toCreate);
  }

  private getUserVotes(user: User): Observable<Vote[]> {
    return super.getByQuery('userId', '==', user.id);
  }

  getMyVotes(): Observable<Vote[]> {
    return this.authService.currentUser.pipe(switchMap(user => this.getUserVotes(user)));
  }

  getByUser(user: User): Observable<Vote[]> {
    return this.getUserVotes(user);
  }

  getTopUsers(): Observable<User[]> {
    return this.userService.getAll().pipe(
      mergeMap((users) => from(users)),
      filter((user: User) => user.name !== undefined && user.picture !== undefined),
      distinctUntilKeyChanged('id'),
      mergeMap((user) => this.getByUser(user).pipe(
        map((votes) => {
          return votes.reduce((acc: any[], vote: Vote) => ([user, (acc[1] + 1 * (vote.type === VoteType.Up ? 1 : -1))]), [user, 0]);
        })
      )),
      map(([user, score]) => ({ ...user, score })),
      scan((users, user) => {
        users.push(user);
        return users;
      }, []),
      map((users) => {
        return users.sort((a, b) => (a.score > b.score ? 1 : -1));
      })
    );
  }

}
