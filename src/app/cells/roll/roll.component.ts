import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DiceTowerService } from '../../dice-tower.service';
import { MatButtonModule } from '@angular/material/button';
import { MqttService } from 'ngx-mqtt';
import { ConnectionService } from '../../connection.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-roll',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './roll.component.html',
  styleUrl: './roll.component.scss'
})
export class RollComponent implements ICellRendererAngularComp{
  value?: number;
  params: any;
  constructor(
    private conn: ConnectionService
  ){}
  agInit(params: ICellRendererParams): void {
    console.log(params);
    this.params = params;
    this.value = params.value;
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
