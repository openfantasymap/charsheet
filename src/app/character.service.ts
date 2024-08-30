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

  getField(field: string, asList=true) {
    let ret = this.data;
    let steps = [field];
    if (field.indexOf(".") >= 0){
      steps = field.split('.')
    }
    for(let field of steps){
      if (ret.length === undefined)
        ret = ret[field];
      else{
        const tret = ret.filter((x:any)=>x.type===field);
        if (tret.length === 1)
          ret = tret[0];
        else 
          if (asList)
            ret = tret;
          else 
            ret = Object.fromEntries(tret.map((x:any)=>[x.name, x]));
      } 
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

  
  getFieldUtil(field: string, data: any) {
    let ret = data;
    let steps = [field];
    if (field.indexOf(".") >= 0){
      steps = field.split('.')
    }
    for(let field of steps){
      if (ret.length === undefined)
        ret = ret[field];
      else{
        ret = ret.filter((x:any)=>x.type===field);
        if (ret.length === 1)
          ret = ret[0];
      }
    } 
    return ret;
  }

}
