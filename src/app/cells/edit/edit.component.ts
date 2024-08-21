import { Component, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DiceTowerService } from '../../dice-tower.service';
import { MatButtonModule } from '@angular/material/button';
import { MqttService } from 'ngx-mqtt';
import { ConnectionService } from '../../connection.service';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MasterSheetService } from '../../master-sheet.service';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  value?: number;
  params: any;
  @ViewChild('tooltip') tooltip?:MatTooltip;
  rolled = false;
  constructor(
    private conn: ConnectionService,
    private ms: MasterSheetService,
  ){
    
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.value = params.value;
    //@ts-ignore
    this.ms.observe(this.params.data.aotm, this.params.colDef.field).subscribe(roll=>{
      if(this.tooltip){
        this.tooltip.message=JSON.stringify(roll);
        this.tooltip.show();
        this.rolled = true;
        setTimeout(()=>{this.rolled = false}, 2000)
      }
    })
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    this.value = params.value;
    return true;
  }
  doRoll() {
    this.conn.sendCommand(this.params.colDef.cellRendererParams.partyId, this.params.data.aotm, {'op': 'roll', 'field':this.params.colDef.field});
  }

  edit(){
    const  vs = prompt('new value');
    if(vs){
      const v = parseInt(vs);
      this.conn.sendCommand(this.params.colDef.cellRendererParams.partyId, this.params.data.aotm, {'op': 'set', 'value': v, 'field':this.params.colDef.field});
    }
  }
}
