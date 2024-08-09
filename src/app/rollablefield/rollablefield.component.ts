import { Component, Injector, Input, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { DiceTowerService } from '../dice-tower.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { GamerulesService } from '../gamerules.service';

@Component({
  selector: 'charsheet-rollablefield',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rollablefield.component.html',
  styleUrl: './rollablefield.component.scss'
})
export class RollablefieldComponent implements OnInit {
  @Input() field: string = "";
  @Input() roll: string = "";
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
    this.dt.roll(this.roll);
  }

}
