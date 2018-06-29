import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export interface ErrorResponse {
  code: string;
  message: string;
}

@Injectable()
export class AuthService {

  loggedIn = false;
  _currentUser: ReplaySubject<User> = new ReplaySubject<User>();

  constructor(private afAuth: AngularFireAuth) {}

  get currentUser(): Observable<User> {
    return this._currentUser.pipe(
      distinctUntilChanged()
    );
  }

  isLoggedIn() {
    return this.loggedIn || this.afAuth.auth.onAuthStateChanged((user) => {
      this._currentUser.next(user);
      if (user) {
        this.loggedIn = true;
      }
    });
  }

  signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      (authInfo) => {
        this._currentUser.next(authInfo.user);
        this.loggedIn = true;
      }
    );
  }

  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (authInfo) => {
        this.loggedIn = true;
      }
    );
  }

  signOut(): Promise<any> {
    return this.afAuth.auth.signOut().then(
      () => {
        this.loggedIn = false;
      }
    );
  }
}
