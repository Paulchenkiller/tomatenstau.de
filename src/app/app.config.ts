import { ApplicationConfig, APP_INITIALIZER, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { provideTranslateService } from '@ngx-translate/core';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { isPlatformBrowser } from '@angular/common';
import { TransferState } from '@angular/core';
import { TranslateFsLoader } from './translate-fs.loader';

// Components
import { IndexComponent } from './index/index.component';
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
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
        languages: {
          perl: () => import('highlight.js/lib/languages/perl'),
          python: () => import('highlight.js/lib/languages/python'),
          java: () => import('highlight.js/lib/languages/java'),
          prolog: () => import('highlight.js/lib/languages/prolog'),
          javascript: () => import('highlight.js/lib/languages/javascript'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          haskell: () => import('highlight.js/lib/languages/haskell'),
          text: () => import('highlight.js/lib/languages/plaintext'),
        },
      },
    },
    provideRouter([
      {
        path: '',
        component: IndexComponent,
        data: { breadcrumb: 'Home', logo: 'home' },
      },
      {
        path: 'code',
        data: { breadcrumb: 'Code', logo: 'terminal' },
        children: [
          {
            path: '',
            loadComponent: () => import('./code/code.component').then((m) => m.CodeComponent),
          },
          {
            path: 'perl',
            data: { breadcrumb: 'Perl', logo: 'keyboard' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./code/perl/perl-index/perl-index.component').then(
                    (m) => m.PerlIndexComponent,
                  ),
              },
              {
                path: 'regex-greediness',
                data: { breadcrumb: 'Regex Greedy/Lazy', logo: 'arrows-left-right' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/perl/perl-regex-greediness/perl-regex-greediness.component'
                      ).then((m) => m.PerlRegexGreedinessComponent),
                  },
                ],
              },
              {
                path: 'context',
                data: { breadcrumb: 'Kontext', logo: 'list' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import('./code/perl/perl-context/perl-context.component').then(
                        (m) => m.PerlContextComponent,
                      ),
                  },
                ],
              },
            ],
          },
          {
            path: 'python',
            data: { breadcrumb: 'Python', logo: ['fab', 'python'] },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./code/python/python-index/python-index.component').then(
                    (m) => m.PythonIndexComponent,
                  ),
              },
              {
                path: 'mutable-default',
                data: { breadcrumb: 'Mutable Default', logo: 'exclamation' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/python/python-mutable-default/python-mutable-default.component'
                      ).then((m) => m.PythonMutableDefaultComponent),
                  },
                ],
              },
              {
                path: 'gil-threads',
                data: { breadcrumb: 'GIL & Threads', logo: 'spinner' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import('./code/python/python-gil-threads/python-gil-threads.component').then(
                        (m) => m.PythonGilThreadsComponent,
                      ),
                  },
                ],
              },
            ],
          },
          {
            path: 'java',
            data: { breadcrumb: 'Java', logo: 'mug-hot' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./code/java/java-index/java-index.component').then(
                    (m) => m.JavaIndexComponent,
                  ),
              },
              {
                path: 'equals-hashcode',
                data: { breadcrumb: 'equals & hashCode', logo: 'equals' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/java/java-equals-hashcode/java-equals-hashcode.component'
                      ).then((m) => m.JavaEqualsHashcodeComponent),
                  },
                ],
              },
              {
                path: 'concurrent-modification',
                data: { breadcrumb: 'ConcurrentModification', logo: 'code-branch' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/java/java-concurrent-modification/java-concurrent-modification.component'
                      ).then((m) => m.JavaConcurrentModificationComponent),
                  },
                ],
              },
            ],
          },
          {
            path: 'javascript',
            data: { breadcrumb: 'JavaScript/TypeScript', logo: 'code' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./code/javascript/javascript-index/javascript-index.component').then(
                    (m) => m.JavascriptIndexComponent,
                  ),
              },
              {
                path: 'closures-scope',
                data: { breadcrumb: 'Closures & Scope', logo: 'code' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/javascript/javascript-closures-scope/javascript-closures-scope.component'
                      ).then((m) => m.JavascriptClosuresScopeComponent),
                  },
                ],
              },
              {
                path: 'hoisting-tdz',
                data: { breadcrumb: 'Hoisting & TDZ', logo: 'code' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/javascript/javascript-hoisting-tdz/javascript-hoisting-tdz.component'
                      ).then((m) => m.JavascriptHoistingTdzComponent),
                  },
                ],
              },
              {
                path: 'async-await',
                data: { breadcrumb: 'async/await', logo: 'code' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/javascript/javascript-async-await/javascript-async-await.component'
                      ).then((m) => m.JavascriptAsyncAwaitComponent),
                  },
                ],
              },
              {
                path: 'this-arrow',
                data: { breadcrumb: 'this & Arrow', logo: 'code' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/javascript/javascript-this-arrow/javascript-this-arrow.component'
                      ).then((m) => m.JavascriptThisArrowComponent),
                  },
                ],
              },
              {
                path: 'ts-structural-typing',
                data: { breadcrumb: 'TS Structural Typing', logo: 'code' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/javascript/typescript-structural-typing/typescript-structural-typing.component'
                      ).then((m) => m.TypescriptStructuralTypingComponent),
                  },
                ],
              },
            ],
          },
          {
            path: 'haskell',
            data: { breadcrumb: 'Haskell', logo: 'code' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./code/haskell/haskell-index/haskell-index.component').then(
                    (m) => m.HaskellIndexComponent,
                  ),
              },
              {
                path: 'purity-io',
                data: { breadcrumb: 'Purity & IO', logo: 'code' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import('./code/haskell/haskell-purity-io/haskell-purity-io.component').then(
                        (m) => m.HaskellPurityIoComponent,
                      ),
                  },
                ],
              },
              {
                path: 'lazy-evaluation',
                data: { breadcrumb: 'Lazy Evaluation', logo: 'code' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/haskell/haskell-lazy-evaluation/haskell-lazy-evaluation.component'
                      ).then((m) => m.HaskellLazyEvaluationComponent),
                  },
                ],
              },
              {
                path: 'typeclasses',
                data: { breadcrumb: 'Typeclasses', logo: 'code' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/haskell/haskell-typeclasses/haskell-typeclasses.component'
                      ).then((m) => m.HaskellTypeclassesComponent),
                  },
                ],
              },
              {
                path: 'monads',
                data: { breadcrumb: 'Monaden', logo: 'code' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import('./code/haskell/haskell-monads/haskell-monads.component').then(
                        (m) => m.HaskellMonadsComponent,
                      ),
                  },
                ],
              },
              {
                path: 'pattern-matching',
                data: { breadcrumb: 'Pattern Matching', logo: 'code' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './code/haskell/haskell-pattern-matching/haskell-pattern-matching.component'
                      ).then((m) => m.HaskellPatternMatchingComponent),
                  },
                ],
              },
            ],
          },
          {
            path: 'prolog',
            data: { breadcrumb: 'Prolog', logo: 'brain' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./code/prolog/prolog-index/prolog-index.component').then(
                    (m) => m.PrologIndexComponent,
                  ),
              },
              {
                path: 'ackermann',
                data: { breadcrumb: 'Ackermann', logo: 'superscript' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import('./code/prolog/prolog-ackermann/prolog-ackermann.component').then(
                        (m) => m.PrologAckermannComponent,
                      ),
                  },
                ],
              },
              {
                path: 'hanoi',
                data: { breadcrumb: 'Hanoi', logo: 'gopuram' },
                children: [
                  {
                    path: '',
                    loadComponent: () =>
                      import('./code/prolog/prolog-hanoi/prolog-hanoi.component').then(
                        (m) => m.PrologHanoiComponent,
                      ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '**',
        loadComponent: () =>
          import('./page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent),
      },
    ]),
  ],
};
