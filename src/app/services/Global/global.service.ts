import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  userDetailsSubject$ = new BehaviorSubject<any>({});

  readonly imageRegex = /\.(png|jpg|jpeg|tiff|icon)$/i;
  readonly pdfRegex = /\.(pdf)$/i;
  readonly excelRegex = /\.(xlsx|xls|csv)$/i;
  readonly videoRegex = /\.(mp4|mov|avi|mkv|flv)$/i;
  readonly audioRegex = /\.(mp3|wav|ogg|flac)$/i;
  readonly docRegex = /\.(doc|docx|DOC|DOCX)$/i;
  readonly textRegex = /\.(txt|TEXT)$/i;

  get userDetails(): User {
    return this.userDetailsSubject$.value;
  }

  openDocumentInNewTab(url: string) {
    window.open(url, '_blank');
  }
}
