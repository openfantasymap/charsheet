import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(
    private h: HttpClient
  ){}
  getList() {
    return this.h.get('/assets/character/list.json')
  }
  private data: any;

  getField(field: string) {
    let ret = this.data;
    let steps = [field];
    if (field.indexOf(".") >= 0){
      steps = field.split('.')
    }
    for(let field of steps){
      ret = ret[field];
    }
    return ret;
  }
  setData(charData: any) {
    this.data = charData;
  }

}
