import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CharacterService } from '../character.service';
import { DiceTowerService } from '../dice-tower.service';
import { take } from 'rxjs';
import { GamerulesService } from '../gamerules.service';

@Component({
  selector: 'charsheet-rollable',
  standalone: true,
  imports: [],
  templateUrl: './rollable.component.html',
  styleUrl: './rollable.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RollableComponent {

  @Input() field: string = "";
  @Input() roll: string = "";
  @Input() tags: string = "";
  public value: string = "";


  constructor(
    private char: CharacterService,
    private dt: DiceTowerService,
    private gr: GamerulesService
  ){}

  ngOnInit(){
    this.value = this.char.getField(this.field);
  }

  doRoll(){
    this.dt.initialize('#dicebox');
    this.dt.result.pipe(take(1)).subscribe(result=>{
      this.gr.evaluateRoll(result, parseInt(this.value));
      this.gr.display(result);
    });
    this.dt.roll(this.roll, this.char.getDice());
  }

}
