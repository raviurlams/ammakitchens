import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { akUtils } from '..//akUtils';
declare var SMS: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  ionicForm: FormGroup;
  defaultDate = "05-05-1980";
  isSubmitted = false;
  hash: any;
  constructor(public formBuilder: FormBuilder, private smsRetriever: SmsRetriever, public akUtils: akUtils) { }

  ngOnInit() {
    this.genHash();
    this.initializeForm();
  }

  initializeForm() {
    this.ionicForm = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(5)]],
      customerFatherName: ['', [Validators.required, Validators.minLength(5)]],
      customerPhNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      customerFatherPhNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      customerDOB: [this.defaultDate, [Validators.required]],
      customerDOJ: [new Date(), [Validators.required]],
      customerGender: ['m'],
      customerAddressProof: ['', [Validators.required, Validators.minLength(7)]],
      customerAddress: ['sample', [Validators.required, Validators.maxLength(15)]],
      customerID: [this.akUtils.generateUUID()],
      customerIsPresent: [true],
      customerLastLogin: [new Date()],
      customerMonthly: ['', [Validators.required, Validators.minLength(1)]],
      customerAdvance: ['', [Validators.required, Validators.minLength(1)]],
      customerRoomType: ['nac'],
      customerFatherOccupation: ['', [Validators.required, Validators.minLength(3)]],
      customerLocation: ['', [Validators.required, Validators.minLength(3)]],
      customerCollege: ['gayatri'],
      customerYear: ['0'],
    })
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('customerDOB').setValue(date, {
      onlyself: true
    })
  }
  onChangeAmount(e, column) {
    var regex = /^\d+$/;
    if (e) {
      if (regex.test(e) && Number(e) > 100) {
        this.ionicForm.get(column).setValue(Number(e), {
          onlyself: true
        })
      } else {
        this.ionicForm.get(column).setValue('', {
          onlyself: true
        })
      }
    }

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
      let otp = Math.floor(100000 + Math.random() * 900000);
      this.sendMessage('+91' + this.ionicForm.value.customerPhNumber, otp);
    }
  }

  retriveSMS() {
    this.smsRetriever.startWatching()
      .then((res: any) => {
        const otp = res.Message.toString().substr(4, 6);
        alert(`OTP Received - ${otp}`);
      })
      .catch((error: any) => console.error(error));
  }

  genHash() {
    // This function is to get hash string of APP.
    // * @return {Promise<string>} Returns a promise that resolves when successfully generate hash of APP.
    this.smsRetriever.getAppHash()
      .then((res: any) => {
        console.log(res);
        //alert('hash : '+res);
        this.hash = res;
      })
      .catch((error: any) => console.error(error));
  }

  sendMessage(number, otp) {
    SMS.sendSMS(number, '<#> ' + otp + ' is your 6 digit OTP from Amma Kitchens', () => {

      this.retriveSMS();
    }, (error) => {
      alert(error);
    });
  }

}
