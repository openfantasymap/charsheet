import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { QRCodeModule } from 'angularx-qrcode';
import { AuthConfig, OAuthModule, OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { StatehandlerService } from './statehandler.service';
import { StorageService } from './storage.service';
import { authInterceptor } from './auth.interceptor';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.hivemq.com',
  port: window.location.protocol.indexOf('https') >= 0?8884:8000,
  path: '/mqtt',
  protocol: window.location.protocol.indexOf('https') >= 0?'wss':'ws',
};

const stateHandlerFn = (stateHandler: StatehandlerService) => {
  return () => {
    return stateHandler.initStateHandler();
  };
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS)),
    importProvidersFrom(QRCodeModule),
    provideOAuthClient({
      resourceServer:{
        sendAccessToken: true,
        allowedUrls: ['https://auth.fantasymaps.org/admin/v1', 'https://auth.fantasymaps.org/oauth/v2','https://auth.fantasymaps.org/oauth/v2/token', 'https://auth.fantasymaps.org/management/v1', 'https://auth.fantasymaps.org/auth/v1/'],

      }
    }),
     {
            provide: APP_INITIALIZER,
            useFactory: stateHandlerFn,
            multi: true,
            deps: [StatehandlerService],
        },
         {
            provide: OAuthStorage,
            useClass: StorageService,

        }
  ],

};
