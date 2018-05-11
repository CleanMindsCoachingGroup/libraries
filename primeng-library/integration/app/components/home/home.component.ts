import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService, UxService, UxMessage } from 'clean-minds-primeng-library';



@Component({
  selector: 'cm-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private msgCount = 0;

  constructor(
    public appService: AppService,
    public uxService: UxService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  showSuccessMessage() {
    this.uxService.pushMessages(new UxMessage(UxMessage.Severity.Success, 99999, 'Message ' + this.msgCount++ + ' showed!'));
  }

  showErrorMessage() {
    this.uxService.pushMessages(new UxMessage(UxMessage.Severity.Error, 99999, 'Message ' + this.msgCount++ + ' showed!'));
  }

  showInfoMessage() {
    this.uxService.pushMessages(new UxMessage(UxMessage.Severity.Info, 99999, 'Message ' + this.msgCount++ + ' showed!'));
  }

  showWarningMessage() {
    this.uxService.pushMessages(new UxMessage(UxMessage.Severity.Warning, 99999, 'Message ' + this.msgCount++ + ' showed!'));
  }

  showLastMessages() {
    this.uxService.showMessagesHistory = true;
  }

  lockUi() {
    this.uxService.lockUx('locking Ux for two seconds...');
    setTimeout(() => {
      this.uxService.unlockUx();
    }, 2000);
  }

  async showConfirmation() {
    if ((await this.uxService.confirm())) {
      this.uxService.pushMessages(
        new UxMessage(UxMessage.Severity.Success, 0, 'Accepted')
      );
    } else {
      this.uxService.pushMessages(
        new UxMessage(UxMessage.Severity.Success, 0, 'Cancelled')
      );
    }
  }

  goChangeGuardPage() {
    this.router.navigate(['change-guard']);
  }

  goLoginPage() {
    this.router.navigate(['login']);
  }
}
