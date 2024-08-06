import { Component, Injector, Input, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { DiceTowerService } from '../dice-tower.service';

@Component({
  selector: 'charsheet-rollablefield',
  standalone: true,
  imports: [],
  templateUrl: './rollablefield.component.html',
  styleUrl: './rollablefield.component.scss'
})
export class RollablefieldComponent implements OnInit {
  @Input() field: string = "";
  @Input() roll: string = "";
  public value?: string;

  constructor(
    private char: CharacterService,
    private dt: DiceTowerService
  ){}

  ngOnInit(){
    this.value = this.char.getField(this.field);
  }

  doRoll(){
    this.dt.roll(this.roll, this.value).subscribe(result=>{
      this.dt.display(result);
    })
  }

}
