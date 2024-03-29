import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/Authentication/authentication.service';
import { UserLogin, UserRegister } from 'src/app/models/user';
import { SessionStorageService } from 'src/app/services/SessionStorage/session-storage.service';
import { SESSION_KEYS } from 'src/app/models/constants';
import { GlobalService } from 'src/app/services/Global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthenticationService,
    private _Router: Router,
    private toastr: ToastrService,
    private _SessionStorage: SessionStorageService,
    private _GlobalService: GlobalService
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
      this.toastr.error(mess, 'Error');
      return false;
    }
    return true;
  }

  OnLogIn() {
    if (!this.validateForm()) return;
    const tempModal = new UserLogin();
    tempModal.username = this.username;
    tempModal.password = this.password;
    this._AuthService.login(tempModal).subscribe(
      (res: any) => {
        if (res) {
          const { Table } = res;
          this.toastr.success(res.message);
          sessionStorage.setItem('token', res.token);
          this._SessionStorage.setItem(SESSION_KEYS.UID, `${Table?.id || ''}`);
          this._SessionStorage.setItem(
            SESSION_KEYS.USER_NAME,
            `${Table?.username || ''}`
          );
          this._SessionStorage.setItem(
            SESSION_KEYS.NAME,
            `${Table?.name || ''}`
          );
          this._SessionStorage.setItem(
            SESSION_KEYS.USER_PHOTO,
            `${Table?.photo || ''}`
          );
          const userInfo = {
            id: Table?.id,
            name: Table?.name,
            username: Table?.username,
            photo: Table?.photo,
          };
          this._GlobalService.userDetailsSubject$.next(userInfo);
          this.clearItems();
          this._Router.navigate(['/dashboard']);
        }
      },
      (error: any) => {
        this.toastr.error('Oops', error.error.message);
      }
    );
  }

  OnSignUp() {
    if (!this.validateForm()) return;
    const tempModal = new UserRegister();
    tempModal.name = this.name;
    tempModal.username = this.username;
    tempModal.password = this.password;
    this._AuthService.register(tempModal).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success(res.message);
          this.toggleContainer();
        }
      },
      (error: any) => {
        this.toastr.error('Oops', error.error.message);
      }
    );
  }

  clearItems() {
    this.name = '';
    this.username = '';
    this.password = '';
  }
}
