import { Component, OnInit } from '@angular/core';
import { LoginModel } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variables
  // public loginForm: any;
  public dataSet: LoginModel;
  constructor() {
    this.dataSet = new LoginModel();
  }

  ngOnInit() {
  }

  submit(value: FormData) {
    this.dataSet = this.dataSet.deserialized(value);
    console.log(this.dataSet);
  }

}
