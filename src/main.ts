import { AppComponent } from './app/app.component';

import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideHttpClient(withInterceptorsFromDi())],
}).catch((err) => console.error(err));
