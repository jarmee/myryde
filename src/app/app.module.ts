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
import { DataService } from 'src/app/shared/services/data.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    RankComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MyrydeMaterialModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
