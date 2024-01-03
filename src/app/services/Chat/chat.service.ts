import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from '../SessionStorage/session-storage.service';
import { Chat } from 'src/app/models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private _Http: HttpClient,
    private _SessionStorage: SessionStorageService
  ) {}

  readonly rootUrl = environment.API;

  getMessages(senderId: number, receiverId: number) {
    return this._Http.get(
      `${this.rootUrl}/chat/GetMessages?senderID=${senderId}&receiverID=${receiverId}`
    );
  }

  sendMessage(body: Chat) {
    return this._Http.post(`${this.rootUrl}/chat/SendMessage`, body);
  }
}
