import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { concatMap } from 'rxjs';
import { AuthenticationService } from '../services/Authentication/authentication.service';
import { ImageUploadService } from '../services/ImageUpload/image-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(public _AuthService: AuthenticationService , private _ImageUploadService:ImageUploadService , private toast:ToastrService) { }

  uploadImage(event: any, user: User) {
    this._ImageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      concatMap((photoURL) => this._AuthService.updateProfileData({ photoURL }))
    ).subscribe((res: any) => {
      this.toast.success("Image Updated Successfully");
    })
  }
}
