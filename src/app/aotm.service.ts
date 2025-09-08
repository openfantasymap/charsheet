import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AotmService {
  getAgent() {
    return this.h.get<any>(this.BASE_URL+"me");
  }

  BASE_URL = "http://51.159.6.136:59912/api/";

  constructor(
    private h: HttpClient
  ) { }

  getCharacters(charId?: string){
    if (charId){
      return this.h.get(this.BASE_URL+"characters/"+charId);
    } else {
      return this.h.get(this.BASE_URL+"characters")
    }
  }
}
