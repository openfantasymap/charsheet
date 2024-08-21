import { Component } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DiceTowerService } from '../../dice-tower.service';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionService } from '../../connection.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CharViewComponent } from '../../char-view/char-view.component';
@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent implements ICellRendererAngularComp{
  charId?: string;
  params: any;

  constructor(
    private comm: ConnectionService,
    private d: MatDialog
  ){}
  agInit(params: ICellRendererParams): void {
    console.log(params);
    this.params = params;
    this.charId = params.data.aotm;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }
  sendMessage(){
    const msg = prompt("message");
    this.comm.sendMessage(this.params.colDef.cellRendererParams.partyId, "private", "master", this.charId, msg)
  }

  viewSheet(){

  }
}
