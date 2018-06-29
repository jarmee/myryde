import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable, ReplaySubject, from } from 'rxjs';
import { distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';

export interface ErrorResponse {
  code: string;
  message: string;
}

@Injectable()
export class AuthService {

  loggedIn = false;
  _currentUser: ReplaySubject<User> = new ReplaySubject<User>();

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

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
      return user;
    });
  }

  signUp(email: string, password: string): Observable<void> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password)).pipe(
      tap((authInfo) => this._currentUser.next(authInfo.user)),
      tap(() => this.loggedIn = true),
      switchMap((authInfo) => this.userService.createEmptyUser(authInfo.user))
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => this.loggedIn = true)
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
