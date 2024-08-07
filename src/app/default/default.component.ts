import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { GravatarModule } from 'ngx-gravatar';


@Component({
  selector: 'app-default',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, CommonModule, RouterModule, GravatarModule, MatIconModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
