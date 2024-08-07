import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-char-list',
  standalone: true,
  imports: [MatToolbarModule, MatListModule, CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './char-list.component.html',
  styleUrl: './char-list.component.scss'
})
export class CharListComponent implements OnInit {
  chars: any[] = [];
  constructor(
    private c: CharacterService
  ){
  }
  ngOnInit(){
    
    this.c.getList().subscribe((data:any)=>{
      this.chars = data;
    })
  }

  altImg(event:ErrorEvent, path:string){
    if (event.target)
    (event.target as HTMLImageElement).src= path;
    console.log(event, path);

  }
}
