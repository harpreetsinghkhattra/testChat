import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from '../server/server.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
declare var swal;

/** interface */
import { User } from '../utils/user/user-data.interfaces';
import { Register } from '../utils/request/common.request.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public dataSet: Register = { confirm_password: '', email: '', firstName: '', lastName: '', password: '' };
  public registerRequest: Subscription;
  public pattern: any = this.server.PATTERN;
  public isLoading: boolean = false;
  constructor(public server: ServerService, public router: Router) { }

  submit(value: Register) {

    this.isLoading = true;
    setTimeout(() => {
      this.registerRequest = this.server.register(value)
        .subscribe((res) => {
          switch (res.message) {
            case this.server.SUCCESS:
              swal("Success!", "Registeration is successfully done.", "success");
              this.router.navigate(['/login']);
              break;
            case this.server.PRESENT:
              swal("Present!", "Please try with another email address", "info");
              break;
            default:
              swal("Info!", "Please try again", "info");
          }
        }, () => {
          this.isLoading = false;
          swal("Error!", this.server.NETWORK_ERROR, "error");
        }, () => {
          this.isLoading = false;
        })
    }, 3000);
  }

  ngOnInit() {
  }

  ngOnDestroy() {

    /** Unsubscribe request */
    this.registerRequest && this.registerRequest.unsubscribe();
  }
}
