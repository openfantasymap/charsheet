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
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MasterSheetService } from '../master-sheet.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QrComponent } from './qr/qr.component';

@Component({
  selector: 'app-party-master',
  standalone: true,
  imports: [MqttModule, CommonModule,MatSidenavModule, RouterModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatButtonModule, MatListModule, AgGridAngular],
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
  }; 

  messages: any[] = [];
 
  constructor(
    private mqtt: MqttService,
    private ar: ActivatedRoute,
    private p: PartyService,
    private c: CharacterService,
    private g: GamerulesService,
    private conn: ConnectionService,
    private ms: MasterSheetService,
    private d: MatDialog,
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
      this.colDefs = [];
      this.colDefs = this.g.masterView(this.colTypes);
      this.colDefs.map(x=>{
        x['cellRendererParams'] = {"partyId": this.partyId}
      });
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
        if(data.status !== 'join'){
          this.chars.filter(x=>x['aotm']===data.character)[0].connection = data.status;
          this.gridApi.setGridOption("rowData", this.chars);
        } else {
          this.chars.push(data.data);
          this.gridApi.setGridOption("rowData", this.chars);

        }

      });

      
      this.mqtt.observe('aotm/parties/'+this.partyId+'/chat').subscribe((message: IMqttMessage) =>{
        const data = JSON.parse(message.payload.toString()); 
        this.messages.unshift(data);
        if(data.op === 'roll'){
          this.ms.emit(data.character, data.field, data.result);
        }
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

  getResult(message:any){
    return message.result.rolls.map((x:any)=>x.value).join(', ');
  }

  getCharacter(charId: string): any{
    try{
      return this.chars.filter(x=>x.aotm === charId)[0];
    } catch(e){
      console.log(e);
    }
  }

  showJoinLink(party:string){
    this.d.open(QrComponent, {data: {
      url: "https://charsheet-demo.netlify.com/parties/"+party+"/join"
    }})
  }
}
