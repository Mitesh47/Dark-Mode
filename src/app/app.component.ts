import { Component, HostBinding, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';
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
  ) {}

  ngOnInit(): void {
    console.log(this._AuthService.currentUser$);
    this.checkRoutes();
  }

  @ViewChild(MatSidenav) matsidenav!: MatSidenav;
  public isDark: boolean = false;
  hideCommonView: boolean = false;
  deprecatedPagesForUI: string[] = ['/auth/login'];
  loading$ = this.loader.loading$;

  @HostBinding('class') get ThemeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  checkRoutes() {
    this._Router.events.subscribe((event: any) => {
      const currentUrl = event.url?.split('?');
      if (event instanceof NavigationStart) {
        this.hideCommonView = !!this.deprecatedPagesForUI.find(
          (item: string) => item === currentUrl[0]
        );
        if (this.hideCommonView) {
          this.matsidenav?.close();
        }
      }
    });
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
