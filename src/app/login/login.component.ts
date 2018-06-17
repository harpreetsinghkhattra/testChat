import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from '../server/server.service';
import { Subscription } from 'rxjs';
import { LoginModel } from './login.model';
import { Router } from '@angular/router';

/** interface */
import { User } from '../utils/user/user-data.interfaces';
import { Login } from '../utils/request/common.request.interface';

declare var swal;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  //Variables
  public dataSet: Login = { email: '', password: '' };
  public LoginRequest: Subscription;
  public pattern: any = this.server.PATTERN;
  public isLoading: boolean = false;
  constructor(public server: ServerService, public router : Router) {
  }

  ngOnInit() {
  }

  submit(value: Login) {
    this.isLoading = true;
    this.LoginRequest = this.server.login(value)
      .subscribe((res) => {
        switch (res.message) {
          case this.server.SUCCESS:
            this.router.navigate(['/home']);
            break;
          default:
            swal("Email or password is incorrect!", "Please try again", "info");
        }
      }, () => {
        this.isLoading = false;            //Disable overlay loader
      }, () => {
        this.isLoading = false;            //Disable overlay loader
      });
  }

  ngOnDestroy() {
    this.LoginRequest && this.LoginRequest.unsubscribe();
  }
}
