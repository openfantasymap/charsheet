import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamerulesService {
  getSupported(): Observable<any>{
    return this.h.get('/assets/templates/supported.json');
  }

  transform(value: string): string {
    return value.split('.')[value.split('.').length-2];
  }
  masterView(coltypes?:any): ColDef<any, any>[] {
    return this.rules.master;
  }
  getDice(arg0: string) {
    try{
      let ret = this.rules.rules.style.dice[arg0];
      return ret;
    } catch(e){
      return '#2e8555'
    }
  }
  
  rules: any;
  loaded: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private h: HttpClient,
    private sb: MatSnackBar
  ) { }
  loadFor(game: any) {
    this.h.get('/assets/templates/'+game+"/rules.json").subscribe(data=>{
      this.rules = data;
      this.loaded.emit(this.rules);
    })
  }


  evaluateRoll(roll: any, value: number){
    let results:any = {};
    
    for(let nbl of this.rules.rules.roll.default.notable){
      results[nbl] = 0;
      for( let r of roll.rolls){
        if(r.value === this.rules.rules.roll.default[nbl].value){
          results[nbl] += 1;
          r['notable'] = nbl;
        }
      }
    }

    if (this.rules.rules.roll.default.mode === "separate"){
      results['success'] = 0;
      results['insuccess'] = 0;

      roll.rolls.map((x:any)=>{
        if (this.rules.rules.roll.default.criteria === "lower"){
          if (x['value']<=value){
            x['result'] = 'success';
            results.success += 1;
          } else {
            x['result'] = 'insuccess';
            results.insuccess += 1;

          }
        } 
        if (this.rules.rules.roll.default.criteria === "higher"){
          if (x['value']>=value){
            x['result'] = 'success';
            results.success += 1;
          } else {
            x['result'] = 'insuccess';
            results.insuccess += 1;

          }
        }
      })
    } else if(this.rules.rules.roll.default.mode === "highest"){
      results['highest'] = 0;
      roll.rolls.map((x:any)=>{
        if (x['value'] >= results['highest']){
          results['highest'] = x['value'];
        } 
      });
    }
    roll['results'] = results;
    console.log(roll);
  }

  display(roll: any){
    if (this.rules.rules.roll.default.mode === "separate"){
      this.sb.open('rolled: ' + roll.rolls.map((x:any)=>(""+ x.value + (x.result==="success"?"✅":"🟥"))).join(", "));
    } else {
      this.sb.open('rolled: ' + roll.value + "(" + roll.rolls.map((x:any)=>x.value).join(", ") + ")");
    }
  }
}
