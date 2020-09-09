import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }

}
