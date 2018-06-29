import { Routes } from '@angular/router';
import { VoteComponent } from 'src/app/vote/vote.component';
import { RankComponent } from 'src/app/rank/rank.component';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'vote', pathMatch: 'full' },
  { path: 'vote', component: VoteComponent },
  { path: 'rank', component: RankComponent },
  { path: 'rank/profile/:id', component: UserProfileComponent, data : { readOnly : true } },
  { path: 'userprofile', component: UserProfileComponent },
  { path: '**', redirectTo: '/' },
];
