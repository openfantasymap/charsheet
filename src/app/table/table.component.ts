import { Component, Injector, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CharacterService } from '../character.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Input() field: string = "";

  @Input() namefield: string="";
  @Input() descriptionfield: string = "";
  @Input() classfields: string="";

  @Input() template?: string;

  public items?: any[];

  public templateMode = false;

  constructor(
    private char: CharacterService
  ){}

  ngOnInit(){
    this.items = this.char.getField(this.field);
    if (this.template){
      this.templateMode=true;
    }
  }

  getField(field: string, row: any){
    return this.char.getFieldUtil(field, row);
  }

  getFields(fields: string[] = [], row: any = {}){
    let ret =[];
    for (let field of fields){
      if(field){
        ret.push(this.getField(field, row));
      }
    }
    return ret;
  }


}
