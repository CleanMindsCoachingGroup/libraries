import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { CleanMindsPrimeNgModule, UxService } from 'clean-minds-primeng-library';
import { environment } from '../../../environments/environment';

import { CanDeactivateComponent } from './can-deactivate.component';

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
        RouterTestingModule.withRoutes([]),
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

  it('should return that can\'t deactivate if form changes', () => {
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
