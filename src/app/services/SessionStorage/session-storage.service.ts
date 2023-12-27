import { Inject, Injectable } from '@angular/core';
import { CryptoService } from '../Crypto/crypto.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor(private cryptoService: CryptoService) {}

  readonly secretKey = environment.SECRET_KEY;

  public setItem(key: string, value: string) {
    sessionStorage.setItem(
      key,
      this.cryptoService.encrypt(value, this.secretKey)
    );
  }

  public getItem(key: string): string {
    const currentSession: string = sessionStorage.getItem(key) || '';
    if (!currentSession) return currentSession;
    return this.cryptoService.decrypt(currentSession, this.secretKey);
  }
}
