import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GamerulesService {
  getDice(arg0: string) {
    try{
      let ret = this.rules.rules.style.dice[arg0];
      return ret;
    } catch(e){
      return '#2e8555'
    }
  }
  
  rules: any;

  constructor(
    private h: HttpClient,
    private sb: MatSnackBar
  ) { }
  loadFor(game: any) {
    this.h.get('/assets/templates/'+game+"/rules.json").subscribe(data=>{
      this.rules = data;
    })
  }

  evaluateRoll(roll: any, value: number){
    if (this.rules.rules.roll.default.mode === "separate"){
      let results: any = {
        success: 0,
        insuccess: 0
      }

      for(let nbl of this.rules.rules.roll.default.notable){
        results[nbl] = 0;
        for( let r of roll.rolls){
          if(r.value === this.rules.rules.roll.default[nbl].value){
            results[nbl] += 1;
            r['notable'] = nbl;
          }
        }
      }

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
      roll['results'] = results
    }
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
