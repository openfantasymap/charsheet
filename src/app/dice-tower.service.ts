import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
//@ts-ignore
import DiceBox from '@3d-dice/dice-box';



@Injectable({
  providedIn: 'root'
})
export class DiceTowerService {
  diceBox: DiceBox;
  public rolling: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private sb: MatSnackBar

  ){
  }


  initialize(){
    this.diceBox = new DiceBox("#dice-box", {
      assetPath: '/assets/dice-box/',
      offscreen: true,
    })
    this.diceBox.init().then(()=>{
      this.rolling.emit(false);
    });
  }
  display(result: any) {
    console.log(result);
    //this.sb.open('rolled: '+ result.results.join(", "))
  }
  roll(roll: string, value: string | undefined): Observable<any> {
    this.rolling.emit(true)
    
  
    this.diceBox.show();
    this.diceBox.roll(roll);
    setTimeout(()=>{
      this.rolling.emit(false);
    }, 10000)
  
    return of(this.diceBox.getRollResults());
  
    
    //return of({
    //  "roll": roll,
    //  "value": value,
    //  "results": [1,12]
    //});
  }

}
