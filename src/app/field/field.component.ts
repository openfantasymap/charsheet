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
  @Input() modifier?: number|null;
  @Input() list?: string;
  public value?: string;
  public modalText?: string;
  public asList: boolean = true;
  constructor(
    private char: CharacterService,
    private ar: ActivatedRoute,
    private m: MatDialog
  ){}

  ngOnInit(){
    if(this.list){
      this.asList = this.list === 'true';
    }
    if (this.context.length > 0)
      this.field = this.context.replace('$', '1')+"."+this.field;
    this.value = this.char.getField(this.field, this.asList);
    if (this.modifier && this.value){
      this.value = Math.trunc((parseFloat(this.value)*this.modifier)).toString();
    }
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
