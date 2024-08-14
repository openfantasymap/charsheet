import { Component } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DiceTowerService } from '../../dice-tower.service';
@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent implements ICellRendererAngularComp{
  value?: number;
  constructor(
    private dt: DiceTowerService
  ){}
  agInit(params: ICellRendererParams): void {
    console.log(params);
    this.value = params.value;
  }
  refresh(params: ICellRendererParams) {
    this.value = params.value;
    return true;
  }
  doRoll() {
    this.dt.roll(this.value+"d6");
  }
}
