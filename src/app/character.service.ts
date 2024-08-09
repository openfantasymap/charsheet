import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(
    private h: HttpClient
  ){}

  getCharacter(charId?:string){
    return this.h.get('/assets/character/'+charId+".json").pipe(tap(x=> this.setData(x)));
  }
  
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

  getDice(){
    try{
      return this.data.system.dice;
    } catch(e){
      return 'default';
    }
  }

}
