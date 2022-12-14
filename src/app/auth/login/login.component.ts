import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/Authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService: AuthenticationService , private _Router: Router , private toast:ToastrService) { }

  email: string = '';
  password: string = '';

  validateForm(): boolean{
    var mess: string = '';

    if (!this.email) {
      mess += 'Email is required . ';
    }

    if (!this.password) {
      mess += 'Password is required . ';
    }

    if (mess) {
      this.toast.error(mess, 'Error');
      return false;
    }
    return true;
  }

  OnLogIn() {
    if (!this.validateForm()) return;
    this._AuthService.login(this.email, this.password).subscribe((res: any) => {
      if (res) {
        this.toast.success('Logged in Successfully');
        this._Router.navigate(['/dashboard']);
      } else {
        this.toast.error(res.error.errors.message);
      }
    })
  }
}
