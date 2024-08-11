import { Component, Injector, Input, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MessageboxComponent } from '../messagebox/messagebox.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'charsheet-field',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, CommonModule],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent implements OnInit {
  @Input() field: string = "";
  @Input() context: string = "";
  @Input() modal?: string;
  public value?: string;
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

  showModal(){
    if(this.modal){
      this.m.open(MessageboxComponent, {
        width: '300px',
        data: {
          title: this.value,
          message: this.modal
        }
      })
    }
  }

}
