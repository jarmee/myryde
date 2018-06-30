import { Injectable } from '@angular/core';
import { User as FirebaseUser } from 'firebase';
import { Observable, from } from 'rxjs';
import { BaseService } from './base.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from 'src/app/shared/user.model';
import { mapTo, mergeMap, groupBy, map, switchMap, tap, scan, distinctUntilKeyChanged, toArray } from 'rxjs/operators';
import { Vote, VoteType, Score } from 'src/app/shared/vote.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(
    private fireStore: AngularFirestore
  ) {
    super('/users', fireStore);
  }

  createEmptyUser(user: FirebaseUser): Observable<User> {
    const toCreate = ({ id: user.uid });
    return super.create(toCreate).pipe(
      mapTo(toCreate)
    );
  }

  getTopUsers(): Observable<User[]> {
    return this.getAll();
  }
}
