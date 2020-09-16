import { Component, OnInit, ViewChild } from '@angular/core';
import { akUtils } from '..//akUtils';
import { ApiService } from "../api.service";
import * as AWS from 'aws-sdk';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
declare var SMS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  @ViewChild('email') email: any;
  public username: string;
  public password: string;
  public error: string;
  public awsBucket: any = {};
  hash: any;

  constructor(public androidPermissions: AndroidPermissions, private smsRetriever: SmsRetriever, public akUtils: akUtils, private restApi: ApiService) { }

  ionViewDidEnter() {
    this.checkPermissionAndSend();
    this.akUtils.setAWSOBject();
    this.genHash();
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
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

  checkPermissionAndSend() {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
      success => {
        if (!success.hasPermission) {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).
            then((success) => {
              this.sendMessage();
            },
              (err) => {
              });
        }
      },
      err => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).
          then((success) => {
            this.sendMessage();
          },
            (err) => {
            });
      });
  }

  sendMessage() {
    SMS.sendSMS("+918147683919", "Joining in to Amma Kitchens", () => {

      this.retriveSMS();
    }, (error) => {
      alert(error);
    });
  }

  setAWSOBject() {
    // AWS.config.accessKeyId = 'AKIAIT6MPCPLALDLP6HA';
    // AWS.config.secretAccessKey = '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';
    // AWS.config.region = 'us-east-1';
    //this.awsBucket = new AWS.S3({ apiVersion: '2006-03-01' });
    var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    let itemObj = Object.assign({}, this.akUtils.getDefaultItem());
    itemObj.customerAddress.S = "# 37 HSR Layout";
    var params = {
      TableName: 'customer',
      Item: itemObj
    };
    // dynamodb.putItem(params, function (err, data) {
    //   if (err) {
    //     console.log("Error", err);
    //   } else {
    //     console.log("Success", data);
    //   }
    // });
  }

  login() {

  }

}
