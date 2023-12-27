import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor() {}

  encrypt(value: any, key: string) {
    value = value instanceof String ? value : JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(value, key, {
      mode: CryptoJS.mode.CBC,
    }).toString();
    return encrypted;
  }

  /* Method for Decryption */
  decrypt(value: any, key: string): string {
    const decrypted = CryptoJS.AES.decrypt(value, key).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(decrypted);
  }
}
