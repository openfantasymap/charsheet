import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { PartyService } from '../party.service';
import { CharacterService } from '../character.service';
import { GamerulesService } from '../gamerules.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { 
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid, } from 'ag-grid-community'; // Column Definition Type Interface
import { RollComponent } from '../cells/roll/roll.component';
import { ActionsComponent } from '../cells/actions/actions.component';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-party-master',
  standalone: true,
  imports: [MqttModule, CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, AgGridAngular],
  templateUrl: './party-master.component.html',
  styleUrl: './party-master.component.scss'
})
export class PartyMasterComponent {
  partyId: string = "";
  party: any;
  partysub?: Subscription;
  chars: any[] = [];
  private gridApi!: GridApi<any>;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [];

  colTypes = {
      rollable: { 
          cellRenderer: RollComponent
      },
      shaded: {
          cellClass: 'shaded-class'
      }
  }; 
 
  constructor(
    private mqtt: MqttService,
    private ar: ActivatedRoute,
    private p: PartyService,
    private c: CharacterService,
    private g: GamerulesService,
    private conn: ConnectionService,
  ){
    const pid = ar.snapshot.paramMap.get('party');
    if(pid){
      this.partyId = pid;
    }
  }
  altImg(event:ErrorEvent, path:string){
    if (event.target)
    (event.target as HTMLImageElement).src= path;
    console.log(event, path);

  }

  ngOnInit(){
    this.g.loaded.subscribe(data=>{
      this.colDefs = this.g.masterView(this.colTypes);
      this.colDefs.map(x=>x['cellRendererParams'] = {"partyId": this.partyId});
      this.colDefs.unshift({headerName:'connection', field:'connection', width:50});
      this.colDefs.push({headerName: "Actions", cellRenderer: ActionsComponent, cellRendererParams: {}});
      for(let ch of this.party.players){
        this.c.getCharacter(ch).subscribe((cdata:any)=>{
          this.chars.push(cdata);
          this.gridApi.setGridOption("rowData", this.chars);
        })
      }

      this.mqtt.observe('aotm/parties/'+this.partyId+'/status').subscribe((message: IMqttMessage) =>{
        const data = JSON.parse(message.payload.toString());
        console.log(data);
        this.chars.filter(x=>x['aotm']===data.character)[0].connection = data.status;
        this.gridApi.setGridOption("rowData", this.chars);

      });
    })
    this.p.getParty(this.partyId).subscribe((data:any) => {
      this.party = data;
      this.g.loadFor(this.party.game);
    })
  }
  

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }
}
