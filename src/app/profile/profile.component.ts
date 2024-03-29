import { Component, Inject, OnInit } from '@angular/core';
import { GlobalService } from '../services/Global/global.service';
import { environment } from 'src/environments/environment';
import { Cls_SingleFileUpload } from '../Commom/common-class';
import { UserService } from '../services/User/user.service';
import { DatePipe } from '@angular/common';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/SessionStorage/session-storage.service';
import { SESSION_KEYS } from '../models/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public _GlobalService: GlobalService,
    private _UserService: UserService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private _Router: Router,
    private _SessionStorage: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.getUserByID();
    setTimeout(() => {
      this.UserPhoto = {
        FID: 10,
        FileName: this.photo,
        FileType: 'IMAGE',
        BlobFile: '',
      };
    }, 1);
  }

  id: number = 0;
  name: string = '';
  username: string = '';
  photo: string = '';
  password: string = '';
  gender: string = '';
  dob: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';

  UserPhoto = new Cls_SingleFileUpload();

  public rootUrl = environment.API;

  getUserByID() {
    this._UserService
      .getUserByID(this._GlobalService.userDetails.id)
      .subscribe((res: any) => {
        const { Table } = res;
        this.id = Table.id;
        this.name = Table.name;
        this.username = Table.username;
        this.photo = Table.photo;
        this.password = Table.password;
        this.gender = Table.gender;
        this.dob = Table.dob;
        this.dob = this.datePipe.transform(this.dob, 'yyyy-MM-dd') || '';
      });
  }

  OnUpdate() {
    const tempModal = new User();
    tempModal.id = this.id;
    tempModal.name = this.name;
    tempModal.username = this.username;
    // tempModal.password = this.password;
    tempModal.dob = this.dob;
    tempModal.gender = this.gender;
    tempModal.photo = this.UserPhoto.FileName;
    console.log(tempModal);

    this._UserService.updateUser(tempModal).subscribe(
      (res: any) => {
        if (res) {
          const { Table } = res;
          this.toastr.success(res.message);
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
          this._Router.navigate(['/dashboard']);
        }
      },
      (error: any) => {
        this.toastr.error('Oops', error.error.message);
      }
    );
  }
}
