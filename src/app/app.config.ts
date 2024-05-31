import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { httpInterceptorProviders } from './core/helpers/http.interceptor';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    httpInterceptorProviders,
    provideHttpClient(),
    provideAnimations()
  ],
};
