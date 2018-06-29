import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { VoteComponent } from './vote/vote.component';
import { RankComponent } from './rank/rank.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyrydeMaterialModule } from './shared/myryde-material.module';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    RankComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MyrydeMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
