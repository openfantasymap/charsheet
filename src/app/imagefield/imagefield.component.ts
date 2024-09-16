import { Component, Input } from '@angular/core';
import { CharacterService } from '../character.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  @Input() pattern: string="";
  public value?: string;

  constructor(
    private char: CharacterService,
  ){}

  ngOnInit(){
    this.value = this.char.getField(this.field);
    if (this.pattern.length > 0 && this.value?.length){
      this.value = this.pattern.replace('{{field}}', this.value);
    }
    
  }


}
