import { Component, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-authcallback',
  standalone: true,
  imports: [],
  templateUrl: './authcallback.component.html',
  styleUrl: './authcallback.component.scss'
})
export class AuthcallbackComponent {

  
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.handleRedirectCallback();
  }



}
