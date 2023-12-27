import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/Global/global.service';
import { environment } from 'src/environments/environment';
import { Cls_SingleFileUpload } from '../Commom/common-class';
import { UserService } from '../services/User/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public _GlobalService: GlobalService,
    private _UserService: UserService,
    private datePipe: DatePipe
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
    }, 1000);
  }

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
        this.name = Table.name;
        this.username = Table.username;
        this.photo = Table.photo;
        this.password = Table.password;
        this.gender = Table.gender;
        this.dob = Table.dob;
        this.dob = this.datePipe.transform(this.dob, 'yyyy-MM-dd') || '';
      });
  }
}
