import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User as FirebaseUser } from 'firebase';
import { Observable, ReplaySubject, from } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, map } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/user.model';
import { CarService } from 'src/app/shared/services/car.service';

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
    private userService: UserService,
    private carService: CarService
  ) {}

  get currentUser(): Observable<User> {
    return this._currentUser.pipe(
      distinctUntilChanged(),
      switchMap((fireBaseUser: FirebaseUser) => {
        return this.userService.getById(fireBaseUser && fireBaseUser.uid)
      })
    );
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise(
      (resolve) => {

        if (this.loggedIn) {
          resolve(true);
          return;
        }

        this.afAuth.auth.onAuthStateChanged((user) => {
          this._currentUser.next(user);
          if (user) {
            this.loggedIn = true;
            resolve(true);
          }
          resolve(false);
        });
      }
    );
  }

  signUp(email: string, password: string): Observable<User> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password)).pipe(
      tap((authInfo) => this._currentUser.next(authInfo.user)),
      tap(() => this.loggedIn = true),
      switchMap((authInfo) => this.userService.createEmptyUser(authInfo.user)),
      tap((user) => this.carService.createEmptyCar(user))
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => this.loggedIn = true),
      switchMap((authInfo) => this.userService.getById(authInfo.user.uid))
    );
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut().then(
      () => {
        this.loggedIn = false;
      }
    );
  }
}
