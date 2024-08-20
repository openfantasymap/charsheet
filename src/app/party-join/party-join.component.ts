import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PartyService } from '../party.service';
import { CharacterService } from '../character.service';
import { Subscription } from 'rxjs';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-party-join',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, RouterModule, MatListModule],
  templateUrl: './party-join.component.html',
  styleUrl: './party-join.component.scss'
})
export class PartyJoinComponent {

  partyId: string = "";
  party: any;
  partysub?: Subscription;
  chars: any[] = [];
  pchars: any[] = [];
  constructor(
    private ar: ActivatedRoute,
    private p: PartyService,
    private c: CharacterService,
    private r: Router,
    private conn: ConnectionService
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
      if(this.party.bringyourownchar){

      }
      for(let pp of this.party.pregens){
        this.c.getCharacter(pp).subscribe(cdata=>{
          this.pchars.push(cdata);
        })
      }
      for(let pp of this.party.players){
        this.c.getCharacter(pp).subscribe(cdata=>{
          this.chars.push(cdata);
        })
      }
    }
    )
  }

  joinChar(char: any){
    this.conn.joinParty(char.aotm, this.partyId, char);
    this.r.navigate(['/parties', this.partyId, char.aotm]);
  }

}
