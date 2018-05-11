import { Component } from '@angular/core';

import { AppService } from 'clean-minds-primeng-library';
import { LogService } from 'clean-minds-primeng-library';
import { RestApiService } from 'clean-minds-primeng-library';
import { UxService } from 'clean-minds-primeng-library';

@Component({
  selector: 'cm-application-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Clean Minds PrimeNg Library Demo';
  appServiceName: string;
  logServiceName: string;
  apiServiceName: string;
  UxServiceName: string;

  constructor(
    private appService: AppService,
    private logService: LogService,
    private apiService: RestApiService,
    private uxService: UxService,
  ) {
    this.appServiceName = this.appService.constructor.name;
    this.logServiceName = this.logService.constructor.name;
    this.apiServiceName = this.apiService.constructor.name;
    this.UxServiceName = this.uxService.constructor.name;
  }
}
