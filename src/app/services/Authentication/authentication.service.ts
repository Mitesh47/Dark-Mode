import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _Http: HttpClient) {}

  readonly rootUrl = environment.API;

  login(body: any) {
    return this._Http.post(`${this.rootUrl}/user/UserLogin`, body);
  }
}
