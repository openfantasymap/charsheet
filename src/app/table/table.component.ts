import { ChangeDetectionStrategy, Component, Injector, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CharacterService } from '../character.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() field: string = "";

  @Input() namefield: string="";
  @Input() descriptionfield: string = "";
  @Input() classfields: string="";

  @Input() template?: string;
  @Input() templatefields?: string;

  public items?: any[];

  public templateMode = false;
  private templateString?:string;
  private templateFields: string[] = [];

  constructor(
    private char: CharacterService,
    private ds: DomSanitizer
  ){}

  ngOnInit(){
    this.items = this.char.getField(this.field);
    if (this.template){
      this.templateMode=true;
      let temp = document.querySelector(this.template);
      this.templateString = temp?.innerHTML;
    }
    if(this.templatefields){
      this.templateFields = this.templatefields.split('|');
    }
  }

  getField(field: string, row: any){
    return this.char.getFieldUtil(field, row);
  }

  getFields(fields: string[] = [], row: any = {}){
    let ret =[];
    for (let field of fields){
      if(field){
        ret.push(this.char.getFieldUtil(field, row));
      }
    }
    return ret;
  }

  getTemplated(item: any){
    if(this.templateString){
      let t = this.templateString;
      for(let k of this.templateFields){
        t = t.replaceAll('{{'+k+'}}', this.char.getFieldUtil(k,item));
      }
        let sd = this.ds.bypassSecurityTrustHtml(t);
        console.log(sd)
        return sd;
    }
    return null;
  }


}
