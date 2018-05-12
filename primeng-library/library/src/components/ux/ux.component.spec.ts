/* tslint:disable:no-unused-variable */
import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GrowlModule } from 'primeng/growl';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BlockUIModule } from 'primeng/blockui';

import { AppServiceConfig } from '../../../x-shared/src/model/app-service-config';
import { AppService } from '../../../x-shared/src/services/app.service';
import { LogService } from '../../../x-shared/src/services/log.service';
import { WebApiService } from '../../../x-shared/src/services/web-api.service';
import { Environment, EnvironmentDefault } from '../../../x-shared/src/model/environment';
import { Authorization, AuthorizationDefault } from '../../../x-shared/src/model/authorization';
import { UxService } from '../../services/ux.service';
import { UxMessage } from '../../model/ux-message';

import { UxComponent } from './ux.component';

describe('UxComponent', () => {
  let component: UxComponent;
  let fixture: ComponentFixture<UxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UxComponent
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ConfirmDialogModule,
        GrowlModule,
        DialogModule,
        MessagesModule,
        MessageModule,
        BlockUIModule,
      ],
      providers: [
        {
          provide: AppServiceConfig,
          useValue: {
            environment: EnvironmentDefault,
            authorization: AuthorizationDefault,
          }
        },
        AppService,
        LogService,
        WebApiService,
        ConfirmationService,
        UxService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UxComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('shows messages when push to UxService',
    inject(
      [UxService],
      (uxService: UxService) => {

        const compiled = fixture.debugElement.nativeElement;

        uxService.pushMessages(new UxMessage(UxMessage.Severity.Error, 99999, 'Test Message'));
        fixture.detectChanges();
        expect(compiled.querySelector('p-growl').textContent).toContain('Test Message');
      }));
});
