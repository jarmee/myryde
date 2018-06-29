import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  loggedIn = false;

  constructor(private afAuth: AngularFireAuth) {}

  isLoggedIn() {
    return this.loggedIn;
  }

  signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.loggedIn = true;
      }
    );
  }

  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      () => {
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
