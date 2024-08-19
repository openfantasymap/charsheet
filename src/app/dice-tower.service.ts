import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
//@ts-ignore
import DiceBox from '@3d-dice/dice-box';
import { GamerulesService } from './gamerules.service';



@Injectable({
  providedIn: 'root'
})
export class DiceTowerService {
  diceBox: DiceBox;
  selector?: string;
  public rolling: EventEmitter<boolean> = new EventEmitter<boolean>();
  public result: EventEmitter<any> = new EventEmitter<any>();
  public rolled: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private sb: MatSnackBar,
    private gr: GamerulesService
  ){
  }


  initialize(box: string){
    this.selector = box;
    this.rolling.emit(true);
    
  }
  display(result: any) {
    console.log(result);
    this.sb.open('rolled: ' + result.value + "(" + result.rolls.map((x:any)=>x.value).join(", ") + ")");
  }
  roll(roll: string, set:string = "default") {
    setTimeout(()=>{
      this.diceBox = new DiceBox(this.selector, {
        assetPath: '/assets/dice-box/',
        offscreen: true,
        themeColor: this.gr.getDice(set),
      })
      this.diceBox.init().then(()=>{
        this.diceBox.roll(roll).then(()=>{
          this.rolling.emit(false);
          this.result.emit(this.diceBox.getRollResults()[0]);
        });
      });
    }, 250);
  
    
    //return of({
    //  "roll": roll,
    //  "value": value,
    //  "results": [1,12]
    //});
  }

  close(){
    this.diceBox.hide();
  }

}
