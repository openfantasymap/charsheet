import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { PartyService } from '../party.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CharacterService } from '../character.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-party-detail',
  standalone: true,
  imports: [MqttModule, CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './party-detail.component.html',
  styleUrl: './party-detail.component.scss'
})
export class PartyDetailComponent {

  partyId: string = "";
  party: any;
  partysub?: Subscription;
  chars: any[] = [];
  constructor(
    private ar: ActivatedRoute,
    private p: PartyService,
    private c: CharacterService,
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
    this.p.getParty(this.partyId).subscribe((data:any)=>{
      this.party = data;
      for(let pp of this.party.players){
        this.c.getCharacter(pp).subscribe(cdata=>{
          this.chars.push(cdata);
        })
      }
    }
    )
  }

  ngOnDestroy(){
  }
}
