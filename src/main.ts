import { enableProdMode, mergeApplicationConfig } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

const clientConfig = mergeApplicationConfig(appConfig, {
  providers: [provideClientHydration(withEventReplay())],
});

bootstrapApplication(AppComponent, clientConfig);
