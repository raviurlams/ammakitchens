import { Component, OnInit, ViewChild } from '@angular/core';
import { akUtils } from '..//akUtils';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('email') email: any;
  public username: string;
  public password: string;
  public error: string;
  public awsBucket: any = {};

  constructor(public akUtils: akUtils) { }

  ngOnInit() {
    this.akUtils.setAWSOBject();
    this.setAWSOBject();
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
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
