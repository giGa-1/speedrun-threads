import { User } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { enviroment } from '../../environment';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  localeStorageKey = 'threads_user'
  localStorage: undefined | Storage = undefined;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  createUser(name: string) {
    return this.http.post(`${enviroment.apiBaseUrl}/users`, {
      name,
    });
  }

  saveUserToStorage(user: User) {
    if(this.localStorage) {
      this.localStorage.setItem(this.localeStorageKey, JSON.stringify(user))
    }
  }

  getUserFromStorage(): User | null {
    if(this.localStorage) {
      const user = this.localStorage.getItem(this.localeStorageKey);
      return user ? JSON.parse(user) : null
    }
    return null
  }
}
