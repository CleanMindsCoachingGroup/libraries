import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { CleanMindsPrimeNgModule } from 'clean-minds-primeng-library';
import { CleanMindsPrimengLibraryConfig } from 'clean-minds-primeng-library';

import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CanDeactivateComponent } from './components/can-deactivate/can-deactivate.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CanDeactivateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
    CleanMindsPrimeNgModule.forRoot(
      <CleanMindsPrimengLibraryConfig>{
        environment: environment,
        authorization: undefined
      })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
