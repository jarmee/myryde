import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  loggedInUser: string;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.loggedInUserId;
  }

}
