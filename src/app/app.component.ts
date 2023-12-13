import { Component, HostBinding, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from './services/Authentication/authentication.service';
import { DialogConfirmationService } from './services/Dialog/dialog-confirmation.service';
import { LoadingService } from './services/Loading/loading.service';

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
    private loader: LoadingService
  ) {
    this._Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the login page
        this.hideCommonView = event.url === '/auth/login';
      }
    });
  }

  ngOnInit(): void {
    console.log(this._AuthService.currentUser$);
  }

  @ViewChild(MatSidenav) matsidenav!: MatSidenav;
  public isDark: boolean = false;
  hideCommonView: boolean = false;
  loading$ = this.loader.loading$;

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
          this._AuthService.logout().subscribe((res: any) => {
            this._Router.navigate(['/auth/login']);
          });
        }
      });
  }
}
