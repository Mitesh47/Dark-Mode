
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/Authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  constructor(private _AuthService: AuthenticationService, private http: HttpClient) {
  }
  User$ = this._AuthService.currentUser$;
}
