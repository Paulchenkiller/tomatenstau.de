import { provideServerRendering } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { appConfig } from './app.config';
import { TransferState, makeStateKey } from '@angular/core';
import { readFileSync } from 'fs';
import { join } from 'path';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: APP_INITIALIZER,
      useFactory: (transferState: TransferState) => () => {
        // Pre-load translation files on the server
        const languages = ['en', 'de'];
        const distPath = join(process.cwd(), 'dist', 'tomatenstaude', 'browser');

        languages.forEach((lang) => {
          try {
            const filePath = join(distPath, 'assets', 'i18n', `${lang}.json`);
            const content = readFileSync(filePath, 'utf8');
            const data = JSON.parse(content);
            const key = makeStateKey<any>(`transfer-translate-${lang}`);
            transferState.set(key, data);
          } catch (error) {
            console.warn(`Could not load translation file for ${lang}:`, error);
          }
        });
      },
      deps: [TransferState],
      multi: true,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
