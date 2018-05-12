import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Message as PrimeNgMessage } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/api';

import { Environment } from '../model/environment';
import { UxMessage } from '../model/ux-message';
import { AppService } from '../../x-shared/src/services/app.service';
import { LogService } from '../../x-shared/src/services/log.service';
import { WebApiService } from '../../x-shared/src/services/web-api.service';



/**
 * Global Ux control<br>
 *
 * * Ux lock/unlock process and control.
 * * Messages, including the last 10 messages list.
 * * Confirmation popup.
 *
 */
@Injectable()
export class UxService {

  constructor(
    private appService: AppService,
    private logService: LogService,
    private webApiService: WebApiService,
    private confirmationService: ConfirmationService
  ) {
    this.logService.info('UxService created.');
  }

  /**
   * Ux confirmation message
   */
  async confirm(
    confirmation?: {
      message: string;
      icon?: string;
      header?: string;
      acceptVisible?: boolean;
      acceptLabel?: string;
      rejectVisible?: boolean;
      rejectLabel?: string;
    }) {
    return await this.showConfirm(confirmation).toPromise();
  }


  private showConfirm(
    confirmation: {
      message?: string;
      icon?: string;
      header?: string;
      acceptVisible?: boolean;
      acceptLabel?: string;
      rejectVisible?: boolean;
      rejectLabel?: string;
    }
  ): Observable<boolean> {

    const confirmationSubject = new Subject<boolean>();

    if (confirmation == undefined) { confirmation = {}; }

    this.confirmationService.confirm({
      message: confirmation.message != undefined ?
        confirmation.message : (<Environment>this.appService.environment).localization.confirmationDefaultMessage,

      icon: confirmation.icon ?
        confirmation.icon : 'fa fa-question-circle',

      header: confirmation.header ?
        confirmation.header : (<Environment>this.appService.environment).localization.confirmationDefaultHeader,

      acceptVisible: confirmation.acceptVisible != undefined ?
        confirmation.acceptVisible : true,

      acceptLabel: confirmation.acceptLabel && confirmation.acceptVisible ?
        confirmation.acceptLabel : (<Environment>this.appService.environment).localization.confirmationDefaultAcceptLabel,

      rejectVisible: confirmation.rejectVisible != undefined ?
        confirmation.rejectVisible : true,

      rejectLabel: confirmation.rejectLabel && confirmation.rejectVisible ?
        confirmation.rejectLabel : (<Environment>this.appService.environment).localization.confirmationDefaultRejectLabel,

      accept: () => { confirmationSubject.next(true); confirmationSubject.complete(); },
      reject: () => { confirmationSubject.next(false); confirmationSubject.complete(); },
    });

    return confirmationSubject.asObservable();
  }

  /**
  * Ux locking
  */
  private uxLocks = 0; // tslint:disable-line:member-ordering
  private _uxLockMessage: string = undefined; // tslint:disable-line:member-ordering

  get uxLocked(): boolean { return (this.uxLocks > 0) || this.webApiService.runningApiCalls; }
  get uxLockMessage(): string { return this._uxLockMessage; }

  lockUx(message?: string) {
    this.uxLocks += 1;
    if (!this.uxLockMessage) { this._uxLockMessage = message; }
  }
  unlockUx() {
    this.uxLocks -= 1;
    this._uxLockMessage = undefined;
  }


  /**
   * Messages history
   */
  private _showMessagesHistory: boolean; // tslint:disable-line:member-ordering

  public get showMessagesHistory(): boolean { return this._showMessagesHistory; }
  public set showMessagesHistory(value: boolean) { this._showMessagesHistory = value; }

  /**
   * Messages, including the last 10 messages list.
   */

   /**
   * Deliver messages to primeNg growl component in {@link UxComponent}
   */
  public toShowMessagges: PrimeNgMessage[] = []; // tslint:disable-line:member-ordering

  private historyMessages: PrimeNgMessage[] = []; // tslint:disable-line:member-ordering
  /**
   * @returns Last 10 messages list
   */
  get messagesHistory(): PrimeNgMessage[] {
    return this.historyMessages;
  }

  /**
   * Push the messages for its deliver
   */
  public pushMessages(...messages: UxMessage[]) {

    messages.forEach((message) => {
      const primeNgMessage: PrimeNgMessage = <PrimeNgMessage>{
        severity: message.severity,
        summary: message.code.toString(),
        detail: message.detail
      };

      // push the message to show
      this.toShowMessagges.push(primeNgMessage);

      // push the message to history
      if (this.historyMessages.length === 10) {
        this.historyMessages.shift();
      }
      this.historyMessages.push(primeNgMessage);
    });
  }
}
