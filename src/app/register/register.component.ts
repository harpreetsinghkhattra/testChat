import { Component, OnInit } from '@angular/core';
import { RegisterModel } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  dataSet : RegisterModel;
  constructor() { 
    this.dataSet = new RegisterModel('','','','','');
  }

  submit(value : FormData){
    console.log(value);
  }

  ngOnInit() {
  }

}
