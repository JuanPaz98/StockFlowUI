import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, Provider } from "@angular/core";
import { KeycloakBearerInterceptor, KeycloakService } from "keycloak-angular";


function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return Promise.resolve();
    }

    return keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'StockFlow',
        clientId: 'stockflow'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: typeof window !== 'undefined'
          ? window.location.origin + '/assets/silent-check-sso.html'
          : ''
      },
      enableBearerInterceptor: true,
    });
  }
}

export const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService]
}

export const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
};
