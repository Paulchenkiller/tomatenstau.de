import { ApplicationConfig, APP_INITIALIZER, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { provideTranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { TransferState } from '@angular/core';
import { TranslateFsLoader } from './translate-fs.loader';

// Components
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IconService } from './services/icon.service';

export function TranslateLoaderFactory(transferState: TransferState, platformId: object) {
  // Use SSR-compatible loader on server, HTTP loader on client
  return isPlatformBrowser(platformId)
    ? new TranslateFsLoader(transferState, './assets/i18n/', '.json')
    : new TranslateFsLoader(transferState, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideTranslateService({
      fallbackLang: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [TransferState, PLATFORM_ID],
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: (_iconService: IconService) => () => {
        // Initialize icons first
        return Promise.resolve();
      },
      deps: [IconService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService, platformId: object) => () => {
        translate.addLangs(['en', 'de']);
        translate.setDefaultLang('en');

        // Only run browser-specific code on the client side
        if (isPlatformBrowser(platformId)) {
          // Helpers to read/write a simple cookie
          const readCookie = (name: string): string | null => {
            try {
              const nameEQ = name + '=';
              const parts = (document.cookie || '').split(';');
              for (let c of parts) {
                c = c.trim();
                if (c.startsWith(nameEQ)) {
                  return decodeURIComponent(c.substring(nameEQ.length));
                }
              }
            } catch {}
            return null;
          };
          const writeCookie = (name: string, value: string, days: number) => {
            try {
              const maxAge = days > 0 ? `; max-age=${days * 24 * 60 * 60}` : '';
              document.cookie = `${name}=${encodeURIComponent(value)}; path=/${maxAge}`;
            } catch {}
          };

          const params = new URLSearchParams(window.location.search);
          const urlLang = params.get('lang');
          const normalizedUrlLang =
            urlLang && ['en', 'de'].includes(urlLang.toLowerCase()) ? urlLang.toLowerCase() : null;

          const cookieSaved = (readCookie('lang') || '').toLowerCase();
          const cookieLang = ['en', 'de'].includes(cookieSaved) ? cookieSaved : null;
          const saved = localStorage.getItem('lang');
          const browserLangs = navigator.languages || [navigator.language];
          const browserLang =
            browserLangs
              .map((lang) => lang?.toLowerCase().split('-')[0])
              .find((lang) => ['de', 'en'].includes(lang || '')) || 'en';
          const lang = normalizedUrlLang || cookieLang || saved || browserLang || 'en';

          translate.use(lang);
          try {
            if (lang !== saved) {
              localStorage.setItem('lang', lang);
            }
          } catch {}
          try {
            if (cookieLang !== lang) {
              writeCookie('lang', lang, 365);
            }
          } catch {}
        } else {
          // Server-side: just use default language
          translate.use('en');
        }
      },
      deps: [TranslateService, PLATFORM_ID],
      multi: true,
    },
    provideRouter([
      {
        path: '',
        component: IndexComponent,
        data: { breadcrumb: 'Home', logo: 'home' },
      },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
};
