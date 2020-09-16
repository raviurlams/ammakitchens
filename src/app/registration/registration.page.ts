import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { akUtils } from '..//akUtils';
import * as AWS from 'aws-sdk';
declare var SMS: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  ionicForm: FormGroup;
  defaultDate = "05-05-1980";
  hash: any;
  isFormValid: boolean = false;
  public awsBucket: any = {};

  constructor(public formBuilder: FormBuilder, private smsRetriever: SmsRetriever, public akUtils: akUtils) { }

  ngOnInit() {
    this.akUtils.setAWSOBject();
    this.retriveSMS();
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
      customerYear: ['5'],
      acceptConditions: [null, [Validators.required]],
    })
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('customerDOB').setValue(date, {
      onlyself: true
    })
  }
  acceptConditionsFn(e) {
    if (e) {
      if (this.ionicForm.value.acceptConditions == true) {

      } else {
        this.ionicForm.get('acceptConditions').setValue(null, {
          onlyself: true
        })
      }
    }
  }
  onChangeAmount(e, column) {
    var regex = /^\d+$/;
    if (e) {
      if (regex.test(e) && Number(e) > 100) {
        if (this.ionicForm.value.acceptConditions == false) {
          this.isFormValid = false;
        }
        this.ionicForm.get(column).setValue(Number(e), {
          onlyself: true
        })
      } else {
        this.isFormValid = false;
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
    this.isFormValid = false;
    if (!this.ionicForm.valid && this.ionicForm.value.acceptConditions == false) {
      this.isFormValid = false;
      return false;
    } else {
      this.isFormValid = true;
      let str = "New Joinee Name:" + this.ionicForm.value.customerName + "Ph #:" + this.ionicForm.value.customerPhNumber;
      let otp = Math.floor(100000 + Math.random() * 900000);
      this.sendMessage('+91' + this.ionicForm.value.customerPhNumber, otp);
      this.sendMessage('918147683919', str);
    }
  }

  saveIntoAWSOBject() {
    let formValue = this.ionicForm.value;
    var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    let itemObj = Object.assign({}, this.akUtils.getDefaultItem());
    itemObj.customerName.S = formValue.customerName;
    itemObj.customerFatherName.S = formValue.customerFatherName;
    itemObj.customerPhNumber.S = formValue.customerPhNumber;
    itemObj.customerFatherPhNumber.S = formValue.customerFatherPhNumber;
    itemObj.customerDOB.S = formValue.customerDOB;
    itemObj.customerDOJ.S = formValue.customerDOJ;
    itemObj.customerGender.S = formValue.customerGender;
    itemObj.customerAddressProof.S = formValue.customerAddressProof;
    itemObj.customerAddress.S = formValue.customerAddress;
    itemObj.customerID.N = formValue.customerID;
    itemObj.customerLastLogin.S = formValue.customerLastLogin;
    itemObj.customerMonthly.N = formValue.customerMonthly;
    itemObj.customerAdvance.N = formValue.customerAdvance;
    itemObj.customerRoomType.S = formValue.customerRoomType;
    itemObj.customerFatherOccupation.S = formValue.customerFatherOccupation;
    itemObj.customerLocation.S = formValue.customerLocation;
    itemObj.customerCollege.S = formValue.customerCollege;
    itemObj.customerYear.S = formValue.customerYear;
    itemObj.acceptConditions.S = formValue.acceptConditions;

    var params = {
      TableName: 'customer',
      Item: itemObj
    };
    dynamodb.putItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
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
        alert('hash : ' + res);
        this.hash = res;
      })
      .catch((error: any) => console.error(error));
  }

  sendMessage(number, otp) {
    SMS.sendSMS(number, '<#> ' + otp + ' is your 6 digit OTP from Amma Kitchens', () => {
      this.genHash();
    }, (error) => {
      alert(error);
    });
  }

}
