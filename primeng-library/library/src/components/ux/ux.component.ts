import { Component } from '@angular/core';

import { UxService } from '../../providers/ux.service';
import { LogService } from '../../../x-shared/src/providers/log.service';


@Component({
  selector: 'cm-ux',
  templateUrl: './ux.component.html',
  styleUrls: ['./ux.component.css']
})
export class UxComponent {

  constructor(
    public uxService: UxService,
    private logService: LogService
  ) {
    this.logService.debug('UxComponent created.');
  }

}
