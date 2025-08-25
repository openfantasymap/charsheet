import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, from } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUser() {
    return this.auth.getOIDCUser();
  }

  constructor(
    private h: HttpClient,
    public auth: AuthenticationService
  ) {}

  getAgent(){
    this.h.get('')
  }


}
