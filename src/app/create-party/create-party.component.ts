import { CommonModule } from '@angular/common';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { GamerulesService } from '../gamerules.service';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';


import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-create-party',
  standalone: true,
  imports: [MatInputModule, MatNativeDateModule, MatCardModule,MatDatepickerModule,  MatChipsModule, MatIconModule, MatSlideToggleModule,MatFormFieldModule, FormsModule, MatButtonModule,CommonModule,MatSelectModule],
  templateUrl: './create-party.component.html',
  styleUrl: './create-party.component.scss'
})
export class CreatePartyComponent {
  supported:any[] = [];
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly fruits = signal<any[]>([]);
  party: any = {}

  constructor(
    private g: GamerulesService
  ){}

  ngOnInit(){
    this.g.getSupported().subscribe(data=>{
      this.supported = data; 
    })
  }  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.update(fruits => [...fruits, {name: value}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  remove(fruit: any): void {
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      return [...fruits];
    });
  }

  edit(fruit: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index >= 0) {
        fruits[index].name = value;
        return [...fruits];
      }
      return fruits;
    });
  }

}
