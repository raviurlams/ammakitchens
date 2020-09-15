import { Component, OnInit, ViewChild } from '@angular/core';
import { akUtils } from '..//akUtils';
import { ApiService } from "../api.service";
import * as AWS from 'aws-sdk';

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

  constructor(public akUtils: akUtils, private restApi: ApiService) { }

  ionViewDidEnter() {
    this.akUtils.setAWSOBject();
    this.setAWSOBject();
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
    this.restApi.sentOTP('8147683919', "ravindra app test ").subscribe(response => {
      console.log(response);
    })
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
