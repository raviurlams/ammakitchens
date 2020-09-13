import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    this.setAWSOBject();
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }

  setAWSOBject() {
    AWS.config.accessKeyId = 'AKIAIT6MPCPLALDLP6HA';
    AWS.config.secretAccessKey = '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';
    AWS.config.region = 'us-east-1';
    this.awsBucket = new AWS.S3({ apiVersion: '2006-03-01' });
    var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });


    var params = {
      TableName: 'customer',
      Item: {
        'customerID': { N: '001' },
        'customerName': { S: 'Ganesh-Ayyappa' }
      }
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
