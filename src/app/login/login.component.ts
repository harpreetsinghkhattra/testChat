import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from '../server/server.service';
import { Subscription } from 'rxjs';
import { LoginModel } from './login.model';
import { Router } from '@angular/router';

/** interface */
import { User } from '../utils/user/user-data.interfaces';
import { Login, ForgetPassword } from '../utils/request/common.request.interface';

declare var swal;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  //Variables
  public dataSet: Login = { email: '', password: '' };
  public forgetPasswordDataSet: ForgetPassword = { email: '' };
  public LoginRequest: Subscription;
  public ForgetPasswordRequest: Subscription;
  public pattern: any = this.server.PATTERN;
  public isLoading: boolean = false;
  public isForgotPasswordRequestLoading: boolean = false;
  public forgetPassword: string = "none";
  constructor(public server: ServerService, public router: Router) {
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

  /**
   * Forget password
   * @param value: string
   */
  forgetPasswordSubmit(value: ForgetPassword) {
    this.isForgotPasswordRequestLoading = true;
    this.ForgetPasswordRequest = this.server.forgetPassword(value)
      .subscribe((res) => {
        switch (res.message) {
          case this.server.SUCCESS:
            this.forgetPassword = "none";
            break;
          case this.server.NOVALUE:
            swal("Email is not present", "Please try again", "info");
            break;
          default:
            swal("Warning", "Please try again", "info");
        }
      }, () => {
        this.isForgotPasswordRequestLoading = false;            //Disable overlay loader
      }, () => {
        this.isForgotPasswordRequestLoading = false;            //Disable overlay loader
      });
  }

  ngOnDestroy() {
    this.LoginRequest && this.LoginRequest.unsubscribe();
    this.ForgetPasswordRequest && this.ForgetPasswordRequest.unsubscribe();
  }

  openForgetPassword() {
    this.forgetPassword = this.forgetPassword === "none" ? 'block' : "none";
  }

  closePassword() {
    this.forgetPassword = "none";
  }
}
