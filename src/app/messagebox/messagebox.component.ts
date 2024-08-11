import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-messagebox',
  standalone: true,
  imports: [],
  templateUrl: './messagebox.component.html',
  styleUrl: './messagebox.component.scss'
})
export class MessageboxComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string; message: string} 
  ){}
}
