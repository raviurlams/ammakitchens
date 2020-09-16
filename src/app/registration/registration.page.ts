import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  ionicForm: FormGroup;
  defaultDate = "1980-05-05";
  isSubmitted = false;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.ionicForm = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(5)]],
      customerFatherName: ['', [Validators.required, Validators.minLength(5)]],
      customerPhNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customerFatherPhNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customerDOB: [this.defaultDate, [Validators.required]],
      customerDOJ: [new Date(), [Validators.required]],
      customerGender: ['m'],

    })
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('customerDOB').setValue(date, {
      onlyself: true
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }
}
