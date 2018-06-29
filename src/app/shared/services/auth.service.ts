import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User as FirebaseUser } from 'firebase';
import { Observable, ReplaySubject, from } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, map } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/user.model';

export interface ErrorResponse {
  code: string;
  message: string;
}

@Injectable()
export class AuthService {

  loggedIn = false;
  _currentUser: ReplaySubject<FirebaseUser> = new ReplaySubject<FirebaseUser>();

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  get currentUser(): Observable<User> {
    return this._currentUser.pipe(
      distinctUntilChanged(),
      switchMap((fireBaseUser: FirebaseUser) => this.userService.getById(fireBaseUser.uid))
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

  signUp(email: string, password: string): Observable<User> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password)).pipe(
      tap((authInfo) => this._currentUser.next(authInfo.user)),
      tap(() => this.loggedIn = true),
      switchMap((authInfo) => this.userService.createEmptyUser(authInfo.user))
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => this.loggedIn = true),
      switchMap((authInfo) => this.userService.getById(authInfo.user.uid))
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
