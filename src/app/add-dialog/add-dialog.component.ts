import { Component } from '@angular/core';
import { GamerulesService } from '../gamerules.service';
import {MatGridListModule} from '@angular/material/grid-list'
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [MatGridListModule, MatDialogModule, CommonModule, RouterModule],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent {
  games: any[] = [];
  constructor(
    private g: GamerulesService,
    private r: Router
  ) {}

  ngOnInit(){
    this.g.getSupported().subscribe(data=>{
      this.games = data;
    })
  }

  newChar(g: string){
    this.g.loaded.subscribe(gr=>{
      if(gr.characterCreation.mode === "internal") {
        if(gr.characterCreation.types.length > 1){

        } else {
          this.r.navigate(['/','sheets','create',gr.id, gr.characterCreation.types[0]])
        }
      } else {
        window.open(gr.characterCreation.url, '_blank');
      }
    })
    this.g.loadFor(g)
  }

}
