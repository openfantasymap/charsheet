import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PartyService } from '../party.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-party-list',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatListModule, RouterModule, CommonModule],
  templateUrl: './party-list.component.html',
  styleUrl: './party-list.component.scss'
})
export class PartyListComponent {
  chars: any[] = [];
  constructor(
    private p: PartyService
  ){
  }
  ngOnInit(){
    
    this.p.getList().subscribe((data:any)=>{
      this.chars = data;
    })
  }

  altImg(event:ErrorEvent, path:string){
    if (event.target)
    (event.target as HTMLImageElement).src= path;
    console.log(event, path);

  }

}
