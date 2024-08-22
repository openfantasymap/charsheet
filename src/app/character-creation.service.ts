import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterCreationService {
  getFor(game: string, type: string) {
    return this.h.get('/assets/templates/'+game+'/'+type+'/creation.json');
  }

  constructor(
    private h: HttpClient
  ) { }
}
