import { Injectable } from '@angular/core';
import { User as FirebaseUser } from 'firebase';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from 'src/app/shared/user.model';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(fireStore: AngularFirestore) {
    super('/users', fireStore);
  }

  createEmptyUser(user: FirebaseUser): Observable<User> {
    const toCreate = ({ id : user.uid });
    return super.create(toCreate).pipe(
      mapTo(toCreate)
    );
  }
}
