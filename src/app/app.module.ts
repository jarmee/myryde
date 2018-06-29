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
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import {AuthService} from './shared/services/auth.service';
import {AuthGuardService} from './shared/services/auth-guard.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CarViewComponent } from './car-view/car-view.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    RankComponent,
    UserProfileComponent,
    HeaderComponent,
    LoginComponent,
    LayoutComponent,
    CarViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MyrydeMaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
      databaseURL: environment.databaseURL,
      projectId: environment.projectId,
      storageBucket: environment.storageBucket,
      messagingSenderId: environment.messagingSenderId
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    { provide: ENDPOINT_URL, useValue: 'http://localhost:4200/assets' },
    MockDataService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
