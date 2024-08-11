import { Component, Input } from '@angular/core';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-imagefield',
  standalone: true,
  imports: [],
  templateUrl: './imagefield.component.html',
  styleUrl: './imagefield.component.scss'
})
export class ImagefieldComponent {
  @Input() field: string = "";
  @Input() context: string = "";
  public value?: string;

  constructor(
    private char: CharacterService,
  ){}

  ngOnInit(){
    this.value = this.char.getField(this.field);
  }


}
