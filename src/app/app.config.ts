import { ApplicationConfig, APP_INITIALIZER, PLATFORM_ID, isDevMode } from '@angular/core';
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
import { buildRouteMeta } from './routing/route-meta.util';
import {
  resolvePreferredLanguage,
  writeBrowserCookie,
  writeBrowserStorage,
} from './preferences/browser-preferences';

export function TranslateLoaderFactory(transferState: TransferState, platformId: object) {
  // Use SSR-compatible loader on server, HTTP loader on client
  return isPlatformBrowser(platformId)
    ? new TranslateFsLoader(transferState, './assets/i18n/', '.json')
    : new TranslateFsLoader(transferState, './assets/i18n/', '.json');
}

function logPreferenceAccessError(action: string, key: string, error: unknown): void {
  if (isDevMode()) {
    console.warn(`Failed to ${action} for "${key}".`, error);
  }
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
          const logError = (action: string, key: string, error: unknown) =>
            logPreferenceAccessError(action, key, error);
          const { cookieLang, resolvedLang, savedLang } = resolvePreferredLanguage({
            doc: typeof document !== 'undefined' ? document : undefined,
            fallback: 'en',
            logError,
            navigatorLanguage: navigator.language,
            navigatorLanguages: navigator.languages,
            search: window.location.search,
            storage: typeof localStorage !== 'undefined' ? localStorage : undefined,
            supported: ['en', 'de'],
          });

          translate.use(resolvedLang);
          if (resolvedLang !== savedLang) {
            writeBrowserStorage(
              typeof localStorage !== 'undefined' ? localStorage : undefined,
              'lang',
              resolvedLang,
              logError,
            );
          }
          if (cookieLang !== resolvedLang) {
            writeBrowserCookie(
              typeof document !== 'undefined' ? document : undefined,
              'lang',
              resolvedLang,
              365,
              logError,
            );
          }
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
        data: buildRouteMeta('NAV.HOME', 'INDEX.INTRO', 'profile'),
      },
      {
        path: 'code',
        data: buildRouteMeta('NAV.CODE', 'CODE.INTRO'),
        children: [
          { path: '', component: CodeComponent },
          {
            path: 'perl',
            data: buildRouteMeta('NAV.PERL', 'PERL.INDEX.INTRO'),
            children: [
              { path: '', component: PerlIndexComponent },
              {
                path: 'regex-greediness',
                data: buildRouteMeta('NAV.REGEX_GREEDY_LAZY', 'PERL.REGEX.INTRO'),
                children: [{ path: '', component: PerlRegexGreedinessComponent }],
              },
              {
                path: 'context',
                data: buildRouteMeta('NAV.CONTEXT', 'PERL.CONTEXT.INTRO'),
                children: [{ path: '', component: PerlContextComponent }],
              },
            ],
          },
          {
            path: 'python',
            data: buildRouteMeta('NAV.PYTHON', 'PYTHON.INDEX.INTRO'),
            children: [
              { path: '', component: PythonIndexComponent },
              {
                path: 'mutable-default',
                data: buildRouteMeta('NAV.MUTABLE_DEFAULT', 'PYTHON.MUTABLE_DEFAULT.INTRO'),
                children: [{ path: '', component: PythonMutableDefaultComponent }],
              },
              {
                path: 'gil-threads',
                data: buildRouteMeta('NAV.GIL_THREADS', 'PYTHON.GIL_THREADS.INTRO'),
                children: [{ path: '', component: PythonGilThreadsComponent }],
              },
            ],
          },
          {
            path: 'java',
            data: buildRouteMeta('NAV.JAVA', 'JAVA.INDEX.INTRO'),
            children: [
              { path: '', component: JavaIndexComponent },
              {
                path: 'equals-hashcode',
                data: buildRouteMeta('NAV.EQUALS_HASHCODE', 'JAVA.EQUALS_HASHCODE.INTRO'),
                children: [{ path: '', component: JavaEqualsHashcodeComponent }],
              },
              {
                path: 'concurrent-modification',
                data: buildRouteMeta('NAV.CONCURRENT_MODIFICATION', 'JAVA.CONCURRENT.INTRO'),
                children: [{ path: '', component: JavaConcurrentModificationComponent }],
              },
            ],
          },
          {
            path: 'javascript',
            data: buildRouteMeta('NAV.JAVASCRIPT', 'JAVASCRIPT.INDEX.INTRO'),
            children: [
              { path: '', component: JavascriptIndexComponent },
              {
                path: 'closures-scope',
                data: buildRouteMeta('NAV.CLOSURES_SCOPE', 'JAVASCRIPT.CLOSURES.INTRO'),
                children: [{ path: '', component: JavascriptClosuresScopeComponent }],
              },
              {
                path: 'hoisting-tdz',
                data: buildRouteMeta('NAV.HOISTING_TDZ', 'JAVASCRIPT.HOISTING.INTRO'),
                children: [{ path: '', component: JavascriptHoistingTdzComponent }],
              },
              {
                path: 'async-await',
                data: buildRouteMeta('NAV.ASYNC_AWAIT', 'JAVASCRIPT.ASYNC.INTRO'),
                children: [{ path: '', component: JavascriptAsyncAwaitComponent }],
              },
              {
                path: 'this-arrow',
                data: buildRouteMeta('NAV.THIS_ARROW', 'JAVASCRIPT.THIS.INTRO'),
                children: [{ path: '', component: JavascriptThisArrowComponent }],
              },
              {
                path: 'ts-structural-typing',
                data: buildRouteMeta('NAV.TS_STRUCTURAL_TYPING', 'JAVASCRIPT.TS.INTRO'),
                children: [{ path: '', component: TypescriptStructuralTypingComponent }],
              },
            ],
          },
          {
            path: 'haskell',
            data: buildRouteMeta('NAV.HASKELL', 'HASKELL.INDEX.INTRO'),
            children: [
              { path: '', component: HaskellIndexComponent },
              {
                path: 'purity-io',
                data: buildRouteMeta('NAV.PURITY_IO', 'HASKELL.PURITY.INTRO'),
                children: [{ path: '', component: HaskellPurityIoComponent }],
              },
              {
                path: 'lazy-evaluation',
                data: buildRouteMeta('NAV.LAZY_EVALUATION', 'HASKELL.LAZY.INTRO'),
                children: [{ path: '', component: HaskellLazyEvaluationComponent }],
              },
              {
                path: 'typeclasses',
                data: buildRouteMeta('NAV.TYPECLASSES', 'HASKELL.TYPECLASSES.INTRO'),
                children: [{ path: '', component: HaskellTypeclassesComponent }],
              },
              {
                path: 'monads',
                data: buildRouteMeta('NAV.MONADS', 'HASKELL.MONADS.INTRO'),
                children: [{ path: '', component: HaskellMonadsComponent }],
              },
              {
                path: 'pattern-matching',
                data: buildRouteMeta('NAV.PATTERN_MATCHING', 'HASKELL.PATTERN.INTRO'),
                children: [{ path: '', component: HaskellPatternMatchingComponent }],
              },
            ],
          },
          {
            path: 'prolog',
            data: buildRouteMeta('NAV.PROLOG', 'PROLOG.INDEX.INTRO'),
            children: [
              { path: '', component: PrologIndexComponent },
              {
                path: 'ackermann',
                data: buildRouteMeta('NAV.ACKERMANN', 'PROLOG.ACKERMANN.P1'),
                children: [{ path: '', component: PrologAckermannComponent }],
              },
              {
                path: 'hanoi',
                data: buildRouteMeta('NAV.HANOI', 'PROLOG.HANOI.P1'),
                children: [{ path: '', component: PrologHanoiComponent }],
              },
            ],
          },
        ],
      },
      {
        path: '**',
        component: PageNotFoundComponent,
        data: buildRouteMeta('404.TITLE', '404.SUBTITLE'),
      },
    ]),
  ],
};
