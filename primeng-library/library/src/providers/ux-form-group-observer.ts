import { HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ComponentCanDeactivate } from './cancellation-guard.service';
import { AppService } from '../../x-shared/src/providers/app.service';
import { LogService } from '../../x-shared/src/providers/log.service';


/**
 * Base class for components with FormGroup changes guard.
 * Can be inherit by application components for deactivation control, wich must implement
 * * AfterViewInit and OnDestroy
 * * Changes guard deactivation on Accept
 *
 * Component example:
 *   ...
 *   export class PageComponent extends UxFormChangeObserver implements AfterViewInit, OnDestroy {
 *
 *      ngAfterViewInit() {
 *        this.activateUxFormChangeObserver(this.formGroup);
 *      }
 *
 *     ngOnDestroy() {  // tslint:disable-line:use-life-cycle-interface
 *        this.deactivateChangeObserver();
 *     }
 *
 *     acceptClick() {
 *       this.deactivateChangeObserver();
 *       this.router.navigate(['home']);
 *   }
 *   ...
 */
export class UxFormGroupObserver implements ComponentCanDeactivate {

  private formGroupObserved: FormGroup;
  private formGroupUpdated: boolean;
  private formGroupChangeSubscription: Subscription;

  constructor(
    private observerAppService: AppService,
    private observerLogService: LogService
  ) {
    this.observerLogService.info('UxFormChangeObserver created.');
  }


  /**
   * Form changes flag
   */
  get pendingChanges(): boolean { return this.formGroupUpdated; }



  /**
   * Form change control activation.
   */
  public activateChangeObserver(formGroup: FormGroup) {
    if (this.formGroupObserved && !this.formGroupChangeSubscription.closed) {
      this.formGroupChangeSubscription.unsubscribe();
    }
    this.formGroupObserved = formGroup;
    this.formGroupChangeSubscription =
      this.formGroupObserved.valueChanges.subscribe(
        x => this.formGroupUpdated = true
      );
      this.observerLogService.info('UxFormChangeObserver activated.');
    }



  /**
   * Form change control deactivation.
   */
  deactivateChangeObserver() {  // tslint:disable-line:use-life-cycle-interface
    if (!this.formGroupChangeSubscription.closed) {
      this.formGroupChangeSubscription.unsubscribe();
    }
    this.formGroupUpdated = false;
    this.observerLogService.info('UxFormChangeObserver deactivated.');
  }



  /**
   * @angular interface for change control at component deactivation
   */
  public canDeactivate(): boolean {
    return !this.formGroupUpdated;
  }



  /**
   * Change control at deactivation from browser url change
   */
  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = (<any>this.observerAppService.environment).localization.msgConfirmDeactivation;
    }
  }

}
