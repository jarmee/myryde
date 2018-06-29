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

  currentUserId: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.pipe(
      pluck('id')
    ).subscribe((id: string) => this.currentUserId = id);
  }

  goToCurrentUserProfile() {
    this.authService.currentUser.pipe(
      pluck('id')
    ).subscribe((id: string) => this.router.navigate(['/userprofile', id]));
  }
}
