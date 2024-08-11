import { Component, Input } from '@angular/core';
import { CharacterService } from '../character.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss'
})
export class ToggleComponent {

  @Input() label: string = "";
  @Input() field: string = "";

  value = false;

  @Input() context: string = "";
  @Input() modal?: string;
  public modalText?: string;

  constructor(
    private char: CharacterService,
    private ar: ActivatedRoute,
    private m: MatDialog
  ){}

  ngOnInit(){
    if (this.context.length > 0)
      this.field = this.context.replace('$', '1')+"."+this.field;
    this.value = this.char.getField(this.field);
  }

  toggle(){
    this.value = !this.value;
  }

}
