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
    this.awsBucket = new AWS.DynamoDB();
  }

  login() {

  }

}
