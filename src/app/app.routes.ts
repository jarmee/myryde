import { Routes } from '@angular/router';
import { VoteComponent } from 'src/app/vote/vote.component';
import { RankComponent } from 'src/app/rank/rank.component';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', component: LayoutComponent, children: [
      { path: 'vote', component: VoteComponent },
      { path: 'rank', component: RankComponent },
      { path: 'rank/profile/:id', component: UserProfileComponent, data: { readOnly: true } },
      { path: 'userprofile', component: UserProfileComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/login' },
];
