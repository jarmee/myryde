import { Injectable } from '@angular/core';
import { User as FirebaseUser } from 'firebase';
import { Observable, from, combineLatest } from 'rxjs';
import { BaseService } from './base.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from 'src/app/shared/user.model';
import { mapTo, mergeMap, groupBy, map, switchMap, tap, scan, distinctUntilKeyChanged, toArray, reduce } from 'rxjs/operators';
import { Vote, VoteType } from 'src/app/shared/vote.model';
import { VoteService } from 'src/app/shared/services/vote.service';

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
}
