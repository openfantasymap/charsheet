import { Component, Injector, Input, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'charsheet-field',
  standalone: true,
  imports: [],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent implements OnInit {
  @Input() field: string = "";
  @Input() context: string = "";
  public value?: string;

  constructor(
    private char: CharacterService,
    private ar: ActivatedRoute
  ){}

  ngOnInit(){
    if (this.context.length > 0)
      this.field = this.context.replace('$', '1')+"."+this.field;
    this.value = this.char.getField(this.field);
  }

}
