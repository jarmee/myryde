import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, ErrorResponse } from '../shared/services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const user = this.form.get('user').value;
    const password = this.form.get('password').value;
    this.authService.signIn(user, password).then(() => {
      this.router.navigate(['/vote']);
    }).catch(error => {
      console.log(error);
      this.form.get('password').setErrors({ loginFailed: error });
    });
  }

  register() {
    this.authService.signUp(this.form.value.user, this.form.value.password).then(
      () => this.router.navigate(['/vote'])
    ).catch(error => {
      this.form.get('password').setErrors({ loginFailed: error });
    });
  }

}
