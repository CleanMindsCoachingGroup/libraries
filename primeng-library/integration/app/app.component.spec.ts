import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClient } from '@angular/common/http';

import { CleanMindsPrimeNgModule } from 'clean-minds-primeng-library';
import { environment } from '../environments/environment';
import { AppService, LogService, WebApiService } from 'clean-minds-primeng-library';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        CleanMindsPrimeNgModule.forRoot({environment})
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'The Clean Minds PrimeNg Library Demo'`, () => {
    expect(component.title).toEqual('The Clean Minds PrimeNg Library Demo');
  });

  it('should render Welcome to The Clean Minds PrimeNg Library Demo! in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to The Clean Minds PrimeNg Library Demo!');
  });

  it('should be able to access the core AppService',
    inject(
      [AppService],
      (appService: AppService) => {

        expect(appService.environment).toBeTruthy();
        expect(appService.authorization).toBeTruthy();
      }));

  it('should be able to access the core LogService',
    inject(
      [LogService],
      (logService: LogService) => {

        expect(logService.info).toBeTruthy();
      }));

  it('should be able to access the core WebApiService',
    inject(
      [WebApiService],
      (webApiService: WebApiService) => {

        expect(webApiService.get).toBeTruthy();
      }));

  it('should be able to use the core HTTP interceptor service',
    inject(
      [
        AppService,
        HttpClient,
        HttpTestingController],
      (appService: AppService,
        httpClient: HttpClient,
        httpTestingController: HttpTestingController) => {

        // subscription to http call
        httpClient
          .get('/')
          .subscribe();
        // the http interceptor puts the domain in url from appService.environment.apiBaseUrl
        httpTestingController.expectOne(appService.environment.apiBaseUrl + '/');
      })
  );
});
