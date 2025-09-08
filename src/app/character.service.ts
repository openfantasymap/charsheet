import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, from } from 'rxjs';
import { AotmService } from './aotm.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(
    private h: HttpClient,
    private aotm: AotmService
  ){
  }

  getCharacter(charId?:string){
    return this.aotm.getCharacters(charId).pipe(tap(x => {this.data = x;}));
  }
  
  getList() {
    return this.aotm.getCharacters();
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
