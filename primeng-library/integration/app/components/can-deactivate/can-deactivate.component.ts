import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, LogService, ComponentCanDeactivate } from 'clean-minds-primeng-library';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'cm-application-can-deactivate',
  templateUrl: './can-deactivate.component.html',
  styleUrls: ['./can-deactivate.component.css']
})
export class CanDeactivateComponent implements OnInit, ComponentCanDeactivate {

  formGroup: FormGroup;
  inputText: string;


  constructor(
    appService: AppService,
    logService: LogService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      inputText: new FormControl('', Validators.required)
    });
  }

  canDeactivate() {
    return !(this.formGroup.dirty);
  }

  doAccept() {
    // reset the state of a possible dirty
    this.formGroup.markAsPristine();
    this.router.navigate(['home']);
  }

  doCancel() {
    this.router.navigate(['home']);
  }
}
