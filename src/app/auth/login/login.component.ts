import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/Authentication/authentication.service';
import { UserLogin } from 'src/app/models/user';
import { SessionStorageService } from 'src/app/services/SessionStorage/session-storage.service';
import { SESSION_KEYS } from 'src/app/models/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthenticationService,
    private _Router: Router,
    private toast: ToastrService,
    private _SessionStorage: SessionStorageService
  ) {}

  username: string = '';
  password: string = '';
  name: string = '';

  isActive = false;

  toggleContainer() {
    this.isActive = !this.isActive;
  }

  validateForm(): boolean {
    var mess: string = '';

    if (!this.username) {
      mess += 'Username is required . ';
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
    const tempModal = new UserLogin();
    tempModal.username = this.username;
    tempModal.password = this.password;
    this._AuthService.login(tempModal).subscribe((res: any) => {
      if (res) {
        const { Table } = res;
        this.toast.success(res.message);
        sessionStorage.setItem('token', res.token);
        this._SessionStorage.setItem(SESSION_KEYS.UID, `${Table?.id || ''}`);
        this._SessionStorage.setItem(
          SESSION_KEYS.USER_NAME,
          `${Table?.username || ''}`
        );
        this._SessionStorage.setItem(SESSION_KEYS.NAME, `${Table?.name || ''}`);
        this._SessionStorage.setItem(
          SESSION_KEYS.USER_PHOTO,
          `${Table?.photo || ''}`
        );
        this.clearItems();
        this._Router.navigate(['/dashboard']);
      } else {
        this.toast.error(res.message);
      }
    });
  }

  OnSignUp() {
    if (!this.validateForm()) return;
  }

  clearItems() {
    this.name = '';
    this.username = '';
    this.password = '';
  }
}
