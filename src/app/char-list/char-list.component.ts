import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-char-list',
  standalone: true,
  imports: [MatToolbarModule, MatListModule, CommonModule],
  templateUrl: './char-list.component.html',
  styleUrl: './char-list.component.scss'
})
export class CharListComponent {
  chars = [
    {"id": "ced93837-9f20-4843-9e48-7a4010a0bd25", "name": "Messima Kander-Mal", "game":"coriolis2e"},
    {"id": "ced93837-9f20-4843-9e48-7a4010a0bd23", "name": "Tamarian guy", "game":"sta1e"},
  ]
}
