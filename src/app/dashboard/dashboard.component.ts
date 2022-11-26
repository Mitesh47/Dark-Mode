import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(MatSidenav) matsidenav!: MatSidenav
  title = 'side-nav';
  constructor(private observer: BreakpointObserver) { }

  public isDark: boolean = true;

  @HostBinding('class') get ThemeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light'
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width:800px)']).subscribe((res: any) => {
      if (res.matches) {
        this.matsidenav.mode = 'over';
        this.matsidenav.close();
      } else {
        this.matsidenav.mode = 'side';
        this.matsidenav.open();
      }
    })
  }
}
