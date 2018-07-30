import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register, Login, ForgetPassword } from '../utils/request/common.request.interface';
import { Response } from '../utils/response/common.response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public NOT_VALID: string = 'notValid';
  public SUCCESS: string = 'Success';
  public ERROR: string = 'Error';
  public PRESENT: string = 'Present';
  public NOVALUE: string = 'NoValue';
  public OBJECT_EMPTY: string = 'objEmpty';
  public VALIDATE_ERROR: string = 'validationErr';
  public VARIFICATION_ERROR: string = 'verificationErr';
  public LOGGED_IN: string = "LogedIn";
  public LOGGED_OUT: string = "LogedOut";
  public NETWORK_ERROR: string = "Your request is denied due to network error, please try again";
  public PATTERN: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public BASE_URL: string = "http://localhost:4000/api";
  // public BASE_URL: string = "https://calm-caverns-61482.herokuapp.com/api";
  constructor(public http: HttpClient) { }

  /** Register */
  register(data: Register): Observable<Response<any>> {
    return this.http.post(`${this.BASE_URL}/signup`, data);
  }

  /** Login */
  login(data: Login): Observable<Response<any>> {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }

  /** Forget password */
  forgetPassword(data: ForgetPassword): Observable<Response<any>> {
    return this.http.post(`${this.BASE_URL}/forgetPassword`, data);
  }
}
