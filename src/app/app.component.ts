import { Component, HostBinding, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/Authentication/authentication.service';
import { DialogConfirmationService } from './services/Dialog/dialog-confirmation.service';
import { LoadingService } from './services/Loading/loading.service';
import { SessionStorageService } from './services/SessionStorage/session-storage.service';
import { SESSION_KEYS } from './models/constants';
import { GlobalService } from './services/Global/global.service';
import { environment } from 'src/environments/environment';

const AVOID_PREFIX_URLS: string[] = ['/', '/auth/login'];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private _Router: Router,
    public _AuthService: AuthenticationService,
    private _DialogService: DialogConfirmationService,
    private loader: LoadingService,
    private _SessionStorage: SessionStorageService,
    public _GlobalService: GlobalService
  ) {}

  ngOnInit(): void {
    const userInfo = {
      id: this._SessionStorage.getItem(SESSION_KEYS.UID),
      name: this._SessionStorage.getItem(SESSION_KEYS.NAME),
      username: this._SessionStorage.getItem(SESSION_KEYS.USER_NAME),
      photo: this._SessionStorage.getItem(SESSION_KEYS.USER_PHOTO),
    };
    this._GlobalService.userDetailsSubject$.next(userInfo);
  }

  @ViewChild(MatSidenav) matsidenav!: MatSidenav;
  rootUrl: string = environment.API;
  public isDark: boolean = false;
  username: string = '';
  name: string = '';
  photo: string = '';

  get avoidPrefix() {
    const currentUrl = this._Router.url?.split('?')[0];
    return !!AVOID_PREFIX_URLS.find((el) => el === currentUrl);
  }

  @HostBinding('class') get ThemeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  OnLogOut() {
    this._DialogService
      .openDialog({
        title: 'Are you sure?',
        message: 'Are you sure you want to Logout?',
        cancelButton: 'No',
        confirmButton: 'Yes',
      })
      .subscribe((res: any) => {
        if (res === true) {
          sessionStorage.clear();
          this._Router.navigate(['/auth/login']);
          setTimeout(() => {
            location.reload();
          }, 0);
        }
      });
  }
}
