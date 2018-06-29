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
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    RankComponent,
    UserProfileComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent
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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    { provide: ENDPOINT_URL, useValue: 'http://localhost:4200/assets' },
    MockDataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
