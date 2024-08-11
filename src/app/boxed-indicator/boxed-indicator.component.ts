import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CharacterService } from '../character.service';
import { RollableComponent } from '../rollable/rollable.component';
import { DiceTowerService } from '../dice-tower.service';
import { GamerulesService } from '../gamerules.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-boxed-indicator',
  standalone: true,
  imports: [CommonModule, RollableComponent],
  templateUrl: './boxed-indicator.component.html',
  styleUrl: './boxed-indicator.component.scss'
})
export class BoxedIndicatorComponent {
  @Input() min = "";
  @Input() max = "";
  @Input() context: string = "";
  @Input() title= "test";
  @Input() field= "";
  @Input() mode="fill";
  value = 0;
  @Input() maxvalue = 9;
  @Input() minvalue = 0;

  @Input() showtitle: boolean|string = true;

  @Input() interactive: boolean|string = true;

  items_empty: number[] = [];
  items_full: number[] = [];

  @Input() dice?: string;
  @Input() rollvalue?: boolean|string = true;

  constructor(
    private char: CharacterService,
    private dt: DiceTowerService,
    private gr: GamerulesService
  ) {}

  ngOnInit() {
    if (this.context.length > 0)
      this.field = this.context.replace('$', '1')+"."+this.field;
    this.value = parseInt(this.char.getField(this.field));
    if(this.max.length>0){
      if (this.context.length > 0)
        this.max = this.context.replace('$', '1')+"."+this.max;
      this.maxvalue = parseInt(this.char.getField(this.max));
    }
    this.set(this.value);

    this.showtitle = this.showtitle === 'false'?false:true;
    this.interactive = this.interactive === 'false'?false:true;
    this.rollvalue = this.rollvalue === 'false'?false:true;
  }

  set(value:number){
    if(this.interactive){
      this.value = value;
      if(this.mode === 'fill'){
        this.items_full = Array(this.value).fill(1).map((e,i)=>e+(i*1));
        this.items_empty = Array(this.maxvalue-this.value).fill(1).map((e,i)=>e+((i+this.value)*1));
      } else {
        this.items_empty = Array(this.maxvalue-this.value).fill(1).map((e,i)=>e+(i*1));
        let s = this.items_empty[this.items_empty.length];
        this.items_full = Array(this.value).fill(1).map((e,i)=>e+((i+s)*1));
      }
    }
  }

  
  doRoll(){
    if(this.dice){
      this.dt.initialize('#dicebox');
      this.dt.result.pipe(take(1)).subscribe(result=>{
        this.gr.evaluateRoll(result, this.value);
        this.gr.display(result);
      });
      if (this.rollvalue)
        this.dt.roll(this.value+this.dice, this.char.getDice());
      else 
        this.dt.roll(this.dice, this.char.getDice());
    }
  }

}
