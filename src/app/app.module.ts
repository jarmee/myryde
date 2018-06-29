import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { VoteComponent } from './vote/vote.component';
import { RankComponent } from './rank/rank.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyrydeMaterialModule } from './shared/myryde-material.module';
import { DataService } from 'src/app/shared/services/data.service';
import { MockDataService, ENDPOINT_URL } from './shared/mock-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    RankComponent,
    UserProfileComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MyrydeMaterialModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    { provide: ENDPOINT_URL, useValue: 'http://localhost:4200/assets'},
    MockDataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
