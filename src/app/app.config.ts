import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
