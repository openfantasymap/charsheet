import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, from } from 'rxjs';
import PouchDB from 'pouchdb'; 
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  db: PouchDB.Database;
  constructor(
    private h: HttpClient
  ){
    this.db = new PouchDB('http://51.159.6.136:59912/characters',{auth:{username:'admin',password:'adminpw'},skip_setup: true});
    this.db.info().then((x:any)=>console.log(x));
  }

  getCharacter(charId?:string){
    return from(this.db.find({selector:{aotm:charId}})).pipe(map((x:any)=> {
      this.data = x.docs
      return x.docs[0];
    }));
  }
  


  getList() {
    return from(this.db.find({selector:{owner:'sirmmo@gmail.com'}})).pipe(map((x:any)=> {
      return x.docs;
    }));
    //return this.h.get('/assets/character/list.json')
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
