import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CharacterService } from '../character.service';
import { DiceTowerService } from '../dice-tower.service';
import { Subscription, take } from 'rxjs';
import { GamerulesService } from '../gamerules.service';
import { ConnectionService } from '../connection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'charsheet-rollable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rollable.component.html',
  styleUrl: './rollable.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RollableComponent {

  fieldsub?: Subscription;

  @Input() field: string = "";
  @Input() roll: string = "";
  @Input() tags: string = "";
  public value: string = "";

  highlight = false;


  constructor(
    private char: CharacterService,
    private dt: DiceTowerService,
    private gr: GamerulesService,
    private conn: ConnectionService,
  ){}

  ngOnInit(){
    this.value = this.char.getField(this.field);
    console.log(this.field);
    this.fieldsub = this.conn.observe(this.field).subscribe(data=>{
      if(data.op === 'roll'){
        this.highlight =true;
        setTimeout(()=>{
          this.highlight = false;
        }, 1000);
      }
      if(data.op === 'set'){
        this.value = data.value;
      }
    });
  }

  doRoll(){
    this.dt.initialize('#dicebox');
    this.dt.result.pipe(take(1)).subscribe(result=>{
      this.gr.evaluateRoll(result, parseInt(this.value));
      this.gr.display(result);
    });
    this.dt.roll(this.roll, this.char.getDice());
  }

  ngOnDestroy(){
    this.fieldsub?.unsubscribe();
  }

}
