import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, LogService, UxFormGroupObserver } from 'clean-minds-primeng-library';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'cm-application-change-guard',
  templateUrl: './change-guard.component.html',
  styleUrls: ['./change-guard.component.css']
})
export class ChangeGuardComponent extends UxFormGroupObserver implements OnInit, AfterViewInit, OnDestroy {

  formGroup: FormGroup;
  inputText: string;


  constructor(
    appService: AppService,
    logService: LogService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super(appService, logService);
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      inputText: new FormControl('', Validators.required)
    });
  }

  ngAfterViewInit() {
    this.activateChangeObserver(this.formGroup);
  }

  ngOnDestroy() {  // tslint:disable-line:use-life-cycle-interface
    this.deactivateChangeObserver();
  }


  doAccept() {
    this.deactivateChangeObserver();
    this.router.navigate(['home']);
  }

  doCancel() {
    this.router.navigate(['home']);
  }
}
