import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  currentUser: any;
  constructor(private authService: AuthService) {
    this.currentUser = authService.currentUser;
  }


  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }


  ngAfterViewInit(): void {
    this.currentUser = this.authService.currentUser;
  }
}
