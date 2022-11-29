import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/Authentication/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
constructor(private toastr: ToastrService , private _AuthService:AuthenticationService , private router:Router) { }

  username: string = '';
  mobile: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  validateForm() : boolean {
    var mess: string = '';

    if (!this.username) {
      mess += 'Username is required . '
    }

    if (!this.mobile) {
      mess += 'Mobile number is required . '
    }

    if (!this.email) {
      mess += 'Email is required . '
    }

    if (!this.password) {
      mess += 'Password is required . '
    }

    if (this.confirmPassword != this.password) {
      mess += 'Password does not matches . '
    }

    if (mess) {
      this.toastr.error(mess, 'Error');
      return false;
    }

    return true;
  }

  OnSignUp() {
    if (!this.validateForm()) return;
    this._AuthService.signup(this.username, this.email, this.password).subscribe((res: any) => {
      const { error } = res;
      console.log(error.message);

      // if (!message) {
      //   this.toastr.success("Signed Up Successfully");
      //   this.router.navigate(['/auth/login']);
      // } else {
      //   this.toastr.error(message, 'Error');
      // }
    })
  }
}
