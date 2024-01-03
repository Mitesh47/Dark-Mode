import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { GlobalService } from '../services/Global/global.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/User/user.service';
import { Chat } from '../models/chat';
import { SessionStorageService } from '../services/SessionStorage/session-storage.service';
import { ChatService } from '../services/Chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    public _GlobalService: GlobalService,
    private _UserService: UserService,
    private _SessionStorage: SessionStorageService,
    private _ChatService: ChatService
  ) {
    this.currentUserID = parseInt(this._SessionStorage.getItem('UID'));
  }

  messages: any[] = [];
  message: string = '';

  ngOnInit() {
    this.getAllFriends();
  }

  newMessage$!: Observable<string>;
  friendList: User[] = [];
  username: string = '';
  rootUrl: string = environment.API;
  chatUser: any = {};
  currentUserID: number = 0;
  selectedFriend: any;

  getAllFriends() {
    this._UserService.getAllFriends().subscribe((res: any) => {
      const { Table } = res;
      this.friendList = Table;
    });
  }

  getMessages() {
    this._ChatService
      .getMessages(this.currentUserID, this.chatUser.id)
      .subscribe((res: any) => {
        const { Table } = res;
        this.messages = Table;
        console.log(this.messages);
      });
  }

  openConversation(user: User) {
    this.selectedFriend = user;
    this.chatUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      photo: user.photo,
    };
    this.getMessages();
    this.clearItems();
  }

  onSubmit() {
    debugger;
    if (!this.message) return;
    const tempModal = new Chat();
    tempModal.senderId = this.currentUserID;
    tempModal.receiverId = this.chatUser.id;
    tempModal.content = this.message;
    this._ChatService.sendMessage(tempModal).subscribe((res: any) => {
      if (res) {
        this.getMessages();
      }
      this.clearItems();
    });
  }

  clearItems() {
    this.message = '';
  }
}
