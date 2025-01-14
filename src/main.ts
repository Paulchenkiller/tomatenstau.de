import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { provideRouter } from '@angular/router';
import { IndexComponent } from './app/index/index.component';
import { CodeComponent } from './app/code/code.component';
import { PerlIndexComponent } from './app/code/perl/perl-index/perl-index.component';
import { PythonIndexComponent } from './app/code/python/python-index/python-index.component';
import { PrologIndexComponent } from './app/code/prolog/prolog-index/prolog-index.component';
import { PrologAckermannComponent } from './app/code/prolog/prolog-ackermann/prolog-ackermann.component';
import { PrologHanoiComponent } from './app/code/prolog/prolog-hanoi/prolog-hanoi.component';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
        languages: {
          perl: () => import('highlight.js/lib/languages/perl'),
          python: () => import('highlight.js/lib/languages/python'),
          prolog: () => import('highlight.js/lib/languages/prolog'),
          text: () => import('highlight.js/lib/languages/plaintext'),
          // matlab: () => import('highlight.js/lib/languages/matlab'),
          // shell : () => import('highlight.js/lib/languages/shell'),
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
            children: [{ path: '', component: PerlIndexComponent }],
          },
          {
            path: 'python',
            data: { breadcrumb: 'Python', logo: ['fab', 'python'] },
            children: [{ component: PythonIndexComponent, path: '' }],
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
});
