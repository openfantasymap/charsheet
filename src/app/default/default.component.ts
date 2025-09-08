import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { GravatarModule } from 'ngx-gravatar';
import { UserService } from '../user.service';
import { AuthenticationService } from '../auth.service';
import { AotmService } from '../aotm.service';


@Component({
  selector: 'app-default',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, CommonModule, RouterModule, GravatarModule, MatIconModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

  user: any = {};
  d: any={};

  constructor(
    private usr: UserService,
    private auth: AuthenticationService,
    private aotm: AotmService
  ){}

  ngOnInit(){
    this.aotm.getAgent().subscribe(data=>{
      this.user = data;
    })
  }

}
