import { Component, Injector, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CharacterService } from '../character.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TableComponent implements OnInit {
  @Input() field: string = "";

  public items?: any[];

  constructor(
    private char: CharacterService
  ){}

  ngOnInit(){
    this.items = this.char.getField(this.field);
  }

  slotChange($event:any) {
    const assigned = $event.target.assignedNodes();
    if (assigned.length > 0) {
      console.debug('shotchange', assigned[0]);
    }
  }


}
