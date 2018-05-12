import { async, inject, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CleanMindsPrimeNgModule, UxService, CanDeactivateGuardService } from 'clean-minds-primeng-library';
import { environment } from '../../../environments/environment';
import { AppRoutes } from '../../app.routes';

import { CanDeactivateComponent } from './can-deactivate.component';
import { Router } from '@angular/router';

describe('CanDeactivateComponent', () => {
  let component: CanDeactivateComponent;
  let fixture: ComponentFixture<CanDeactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CanDeactivateComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CleanMindsPrimeNgModule.forRoot({ environment })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should can\'t deactivate if form changes', () => {
    inject(
      [
        UxService
      ],
      (
        uxService: UxService
      ) => {
        component.formGroup.markAsDirty();
        expect(component.canDeactivate()).toBeFalsy();
      });
  });

});
