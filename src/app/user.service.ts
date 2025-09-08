import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, from } from 'rxjs';
import { AuthenticationService } from './auth.service';
import { AotmService } from './aotm.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private h: HttpClient,
    public auth: AuthenticationService,
    private aotm: AotmService
  ) {}

  getAgent(){
    this.aotm.getAgent();
  }


}
