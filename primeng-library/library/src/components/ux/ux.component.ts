import { Component } from '@angular/core';

import { UxService } from '../../services/ux.service';
import { LogService } from '../../../x-shared/src/services/log.service';



/**
 * Gneric component for all Ux services
 */
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
