import { TestBed, fakeAsync, inject, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { environment } from '../environments/environment';

import { CleanMindsPrimeNgModule } from 'clean-minds-primeng-library';

import { AppService } from 'clean-minds-primeng-library';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ChangeGuardComponent } from './components/change-guard/change-guard.component';

import { AppRoutes } from './app.routes';

describe('Router', () => {

  let router: Router;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(AppRoutes),
        ReactiveFormsModule,
        CleanMindsPrimeNgModule.forRoot({environment})
      ],
      declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        ChangeGuardComponent
      ]
    });

    router = TestBed.get(Router);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('navigate to "" redirects to /login',
    fakeAsync(() => {
      router.navigate([''])
        .then(() => {
          expect(router.url).toEqual('/login');
        });
    }));

  it('navigate to "**" redirects to /home',
    fakeAsync(() => {
      router.navigate(['/dummy'])
        .then(() => {
          expect(router.url).toEqual('/home');
        });
    }));

  describe('navigate to "/home"', () => {
    it('redirects to "/login" if the user is not authenticated',
      fakeAsync(() => {
        inject(
          [
            AppService
          ],
          (appService: AppService
          ) => {

            appService.authorization.isAuthenticated = () => false;
            router.navigate(['/home'])
              .then(() => {
                expect(router.url).toEqual('/home');
              });
            // restores the provider value
            appService.authorization.isAuthenticated = () => true;
          });
      }));

    it('sends to "/home" if the user is authenticated',
      fakeAsync(() => {
        router.navigate(['/home'])
          .then(() => {
            expect(router.url).toEqual('/home');
          });
      }));
  });

  describe('navigate to "/none"', () => {
    it('redirects to "/login" if the user is not authenticated',
      fakeAsync(() => {
        inject(
          [
            AppService
          ],
          (appService: AppService
          ) => {

            appService.authorization.isAuthenticated = () => false;
            router.navigate(['/none'])
              .then(() => {
                expect(router.url).toEqual('/home');
              });
            // restores the provider value
            appService.authorization.isAuthenticated = () => true;
          });
      }));

    it('sends to "/home" if the user is authenticated',
      fakeAsync(() => {
        router.navigate(['/none'])
          .then(() => {
            expect(router.url).toEqual('/home');
          });
      }));
  });

});
