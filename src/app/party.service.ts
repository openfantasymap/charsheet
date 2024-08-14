import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(
    private h: HttpClient
  ){}

  getParty(partyId?:string){
    return this.h.get('/assets/parties/'+partyId+".json").pipe(tap(x=> this.setData(x)));
  }
  
  getList() {
    return this.h.get('/assets/parties/list.json')
  }
  private data: any;

  getField(field: string) {
    let ret = this.data;
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
