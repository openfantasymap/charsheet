import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { StatehandlerService } from './statehandler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService { 
  authConfig: AuthConfig = {
    scope: 'openid profile email offline_access',
    responseType: 'code',
    oidc: true,
    clientId: '334798316946663448',
    dummyClientSecret:"qWCZo0swUaNFUoXgB63aMrptaFcMeNpKV0ZdFtgpfUWMRmEAmWrHCu4Aq2Cvo0Ic",
    issuer: 'https://auth.fantasymaps.org', // eg. https://acme-jdo9fs.zitadel.cloud
    redirectUri: 'http://localhost:9323/auth/callback',
    postLogoutRedirectUri: 'http://localhost:9323/signedout',
    requireHttps: false, // required for running locally
  };
   
  private _authenticated: boolean = false;
  private readonly _authenticationChanged: BehaviorSubject<boolean> = new BehaviorSubject(this.authenticated);

  constructor(
    private oauthService: OAuthService,
    private statehandler: StatehandlerService,
  ) {
  }

  public get authenticated(): boolean {
    return this._authenticated;
  }

  public get authenticationChanged(): Observable<boolean> {
    return this._authenticationChanged;
  }

  public getOIDCUser(): Observable<any> {
    return from(this.oauthService.loadUserProfile());
  }

  public async authenticate(setState: boolean = true): Promise<boolean> {
    this.oauthService.configure(this.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.strictDiscoveryDocumentValidation = false;
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this._authenticated = this.oauthService.hasValidAccessToken();

    if (!this.oauthService.hasValidIdToken() || !this.authenticated) {
      const newState = setState ? await this.statehandler.createState().toPromise() : undefined;
      this.oauthService.initCodeFlow(newState);
    }
    this._authenticationChanged.next(this.authenticated);

    return this.authenticated;
  }

  public signout(): void {
    this.oauthService.logOut();
    this._authenticated = false;
    this._authenticationChanged.next(false);
  }
}

