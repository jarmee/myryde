import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, ErrorResponse } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { tap, catchError } from 'rxjs/operators';



const errorFieldMap: { [key: string]: string } = {
  'auth/invalid-email': 'user',
  'auth/email-already-in-use': 'user'
};

function getInvalidField(error: ErrorResponse): string {
  return (errorFieldMap[error.code] && errorFieldMap[error.code] != null ? errorFieldMap[error.code] : 'password');
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const user = this.form.get('user').value;
    const password = this.form.get('password').value;
    this.authService.signIn(user, password)
      .subscribe({
        next: () => this.router.navigate(['/userprofile']),
        error: (error) => this.form.get(getInvalidField(error)).setErrors({ loginFailed: error })
      });
  }

  register() {
    this.authService.signUp(this.form.value.user, this.form.value.password)
      .subscribe({
        next: () => this.router.navigate(['/userprofile']),
        error: (error) => this.form.get(getInvalidField(error)).setErrors({ loginFailed: error })
      });
  }

}
