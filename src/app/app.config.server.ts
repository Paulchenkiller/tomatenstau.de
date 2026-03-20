import { provideServerRendering } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { appConfig } from './app.config';
import { TransferState, makeStateKey } from '@angular/core';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { TranslationDictionary } from './types/translation-dictionary';

function loadTranslationDictionary(filePath: string, lang: string): TranslationDictionary | null {
  if (!existsSync(filePath)) {
    return null;
  }

  let content: string;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`Could not read translation file for ${lang} at ${filePath}.`, error);
    return null;
  }

  try {
    return JSON.parse(content) as TranslationDictionary;
  } catch (error) {
    console.warn(`Could not parse translation file for ${lang} at ${filePath}.`, error);
    return null;
  }
}

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
          const filePath = join(distPath, 'assets', 'i18n', `${lang}.json`);
          const data = loadTranslationDictionary(filePath, lang);
          if (data) {
            const key = makeStateKey<TranslationDictionary>(`transfer-translate-${lang}`);
            transferState.set(key, data);
          }
        });
      },
      deps: [TransferState],
      multi: true,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
