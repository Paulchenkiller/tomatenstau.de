import {
  ApplicationConfig,
  importProvidersFrom,
  APP_INITIALIZER,
  PLATFORM_ID,
  Inject,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';

// Components
import { IndexComponent } from './index/index.component';
import { CodeComponent } from './code/code.component';
import { PerlIndexComponent } from './code/perl/perl-index/perl-index.component';
import { PythonIndexComponent } from './code/python/python-index/python-index.component';
import { PrologIndexComponent } from './code/prolog/prolog-index/prolog-index.component';
import { PrologAckermannComponent } from './code/prolog/prolog-ackermann/prolog-ackermann.component';
import { PrologHanoiComponent } from './code/prolog/prolog-hanoi/prolog-hanoi.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JavaIndexComponent } from './code/java/java-index/java-index.component';
import { JavaEqualsHashcodeComponent } from './code/java/java-equals-hashcode/java-equals-hashcode.component';
import { JavaConcurrentModificationComponent } from './code/java/java-concurrent-modification/java-concurrent-modification.component';
import { PerlRegexGreedinessComponent } from './code/perl/perl-regex-greediness/perl-regex-greediness.component';
import { PerlContextComponent } from './code/perl/perl-context/perl-context.component';
import { PythonMutableDefaultComponent } from './code/python/python-mutable-default/python-mutable-default.component';
import { PythonGilThreadsComponent } from './code/python/python-gil-threads/python-gil-threads.component';
import { JavascriptIndexComponent } from './code/javascript/javascript-index/javascript-index.component';
import { JavascriptClosuresScopeComponent } from './code/javascript/javascript-closures-scope/javascript-closures-scope.component';
import { JavascriptHoistingTdzComponent } from './code/javascript/javascript-hoisting-tdz/javascript-hoisting-tdz.component';
import { JavascriptAsyncAwaitComponent } from './code/javascript/javascript-async-await/javascript-async-await.component';
import { JavascriptThisArrowComponent } from './code/javascript/javascript-this-arrow/javascript-this-arrow.component';
import { TypescriptStructuralTypingComponent } from './code/javascript/typescript-structural-typing/typescript-structural-typing.component';
import { HaskellIndexComponent } from './code/haskell/haskell-index/haskell-index.component';
import { HaskellPurityIoComponent } from './code/haskell/haskell-purity-io/haskell-purity-io.component';
import { HaskellLazyEvaluationComponent } from './code/haskell/haskell-lazy-evaluation/haskell-lazy-evaluation.component';
import { HaskellTypeclassesComponent } from './code/haskell/haskell-typeclasses/haskell-typeclasses.component';
import { HaskellMonadsComponent } from './code/haskell/haskell-monads/haskell-monads.component';
import { HaskellPatternMatchingComponent } from './code/haskell/haskell-pattern-matching/haskell-pattern-matching.component';
import { IconService } from './services/icon.service';

export function HttpLoaderFactory(http: HttpClient, platformId: Object) {
  // During SSR, don't try to load translations via HTTP
  if (!isPlatformBrowser(platformId)) {
    // Return a loader that doesn't make HTTP requests during SSR
    return {
      getTranslation: () => of({}),
    } as any;
  }
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient, PLATFORM_ID],
        },
      }),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: (iconService: IconService) => () => {
        // Initialize icons first
        return Promise.resolve();
      },
      deps: [IconService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService, platformId: Object) => () => {
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
          { path: '', component: CodeComponent },
          {
            path: 'perl',
            data: { breadcrumb: 'Perl', logo: 'keyboard' },
            children: [
              { path: '', component: PerlIndexComponent },
              {
                path: 'regex-greediness',
                data: { breadcrumb: 'Regex Greedy/Lazy', logo: 'arrows-left-right' },
                children: [{ path: '', component: PerlRegexGreedinessComponent }],
              },
              {
                path: 'context',
                data: { breadcrumb: 'Kontext', logo: 'list' },
                children: [{ path: '', component: PerlContextComponent }],
              },
            ],
          },
          {
            path: 'python',
            data: { breadcrumb: 'Python', logo: ['fab', 'python'] },
            children: [
              { path: '', component: PythonIndexComponent },
              {
                path: 'mutable-default',
                data: { breadcrumb: 'Mutable Default', logo: 'exclamation' },
                children: [{ path: '', component: PythonMutableDefaultComponent }],
              },
              {
                path: 'gil-threads',
                data: { breadcrumb: 'GIL & Threads', logo: 'spinner' },
                children: [{ path: '', component: PythonGilThreadsComponent }],
              },
            ],
          },
          {
            path: 'java',
            data: { breadcrumb: 'Java', logo: 'mug-hot' },
            children: [
              { path: '', component: JavaIndexComponent },
              {
                path: 'equals-hashcode',
                data: { breadcrumb: 'equals & hashCode', logo: 'equals' },
                children: [{ path: '', component: JavaEqualsHashcodeComponent }],
              },
              {
                path: 'concurrent-modification',
                data: { breadcrumb: 'ConcurrentModification', logo: 'code-branch' },
                children: [{ path: '', component: JavaConcurrentModificationComponent }],
              },
            ],
          },
          {
            path: 'javascript',
            data: { breadcrumb: 'JavaScript/TypeScript', logo: 'code' },
            children: [
              { path: '', component: JavascriptIndexComponent },
              {
                path: 'closures-scope',
                data: { breadcrumb: 'Closures & Scope', logo: 'code' },
                children: [{ path: '', component: JavascriptClosuresScopeComponent }],
              },
              {
                path: 'hoisting-tdz',
                data: { breadcrumb: 'Hoisting & TDZ', logo: 'code' },
                children: [{ path: '', component: JavascriptHoistingTdzComponent }],
              },
              {
                path: 'async-await',
                data: { breadcrumb: 'async/await', logo: 'code' },
                children: [{ path: '', component: JavascriptAsyncAwaitComponent }],
              },
              {
                path: 'this-arrow',
                data: { breadcrumb: 'this & Arrow', logo: 'code' },
                children: [{ path: '', component: JavascriptThisArrowComponent }],
              },
              {
                path: 'ts-structural-typing',
                data: { breadcrumb: 'TS Structural Typing', logo: 'code' },
                children: [{ path: '', component: TypescriptStructuralTypingComponent }],
              },
            ],
          },
          {
            path: 'haskell',
            data: { breadcrumb: 'Haskell', logo: 'code' },
            children: [
              { path: '', component: HaskellIndexComponent },
              {
                path: 'purity-io',
                data: { breadcrumb: 'Purity & IO', logo: 'code' },
                children: [{ path: '', component: HaskellPurityIoComponent }],
              },
              {
                path: 'lazy-evaluation',
                data: { breadcrumb: 'Lazy Evaluation', logo: 'code' },
                children: [{ path: '', component: HaskellLazyEvaluationComponent }],
              },
              {
                path: 'typeclasses',
                data: { breadcrumb: 'Typeclasses', logo: 'code' },
                children: [{ path: '', component: HaskellTypeclassesComponent }],
              },
              {
                path: 'monads',
                data: { breadcrumb: 'Monaden', logo: 'code' },
                children: [{ path: '', component: HaskellMonadsComponent }],
              },
              {
                path: 'pattern-matching',
                data: { breadcrumb: 'Pattern Matching', logo: 'code' },
                children: [{ path: '', component: HaskellPatternMatchingComponent }],
              },
            ],
          },
          {
            path: 'prolog',
            data: { breadcrumb: 'Prolog', logo: 'brain' },
            children: [
              { path: '', component: PrologIndexComponent },
              {
                path: 'ackermann',
                data: { breadcrumb: 'Ackermann', logo: 'superscript' },
                children: [{ path: '', component: PrologAckermannComponent }],
              },
              {
                path: 'hanoi',
                data: { breadcrumb: 'Hanoi', logo: 'gopuram' },
                children: [{ path: '', component: PrologHanoiComponent }],
              },
            ],
          },
        ],
      },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
};
