import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, UxService, UxMessage } from 'clean-minds-primeng-library';


@Component({
  selector: 'cm-application-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private appService: AppService,
    private uxService: UxService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  doLogin() {
    this.appService.authorization.isAuthenticated = () => true;
    this.uxService.pushMessages(
      new UxMessage(UxMessage.Severity.Success, 0, 'Logged in')
    );
    this.router.navigate(['home']);
  }

}
