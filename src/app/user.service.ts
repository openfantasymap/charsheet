import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser() {
    return this.h.get('/assets/user.json');
  }

  constructor(
    private h: HttpClient
  ) { }


}
