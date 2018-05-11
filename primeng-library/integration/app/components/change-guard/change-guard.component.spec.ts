import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CleanMindsPrimeNgModule } from 'clean-minds-primeng-library';
import { environment } from '../../../environments/environment';

import { ChangeGuardComponent } from './change-guard.component';

describe('ChangeGuardComponent', () => {
  let component: ChangeGuardComponent;
  let fixture: ComponentFixture<ChangeGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChangeGuardComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        CleanMindsPrimeNgModule.forRoot({environment})
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
