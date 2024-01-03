import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from '../SessionStorage/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _Http: HttpClient,
    private _SessionStorage: SessionStorageService
  ) {}

  readonly rootUrl = environment.API;

  getAllUser() {
    return this._Http.get(`${this.rootUrl}/user/GetAllUser`);
  }

  getUserByID(id: number) {
    return this._Http.get(`${this.rootUrl}/user/GetUserByID?UserID=${id}`);
  }

  getAllFriends() {
    const id = this._SessionStorage.getItem('UID');
    return this._Http.get(`${this.rootUrl}/user/GetAllFriends?UserID=${id}`);
  }

  addUser(body: any) {
    return this._Http.post(`${this.rootUrl}/user/InsertUser`, body);
  }

  updateUser(body: any) {
    return this._Http.put(`${this.rootUrl}/user/UpdateUser`, body);
  }
}
