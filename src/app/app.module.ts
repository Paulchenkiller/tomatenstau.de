import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { CodeComponent } from './code/code.component';
import { PrologIndexComponent } from './code/prolog/prolog-index/prolog-index.component';
import { PerlIndexComponent } from './code/perl/perl-index/perl-index.component';
import { PythonIndexComponent } from './code/python/python-index/python-index.component';
import { CommonModule } from '@angular/common';
import { PrologAckermannComponent } from './code/prolog/prolog-ackermann/prolog-ackermann.component';
import { PrologHanoiComponent } from './code/prolog/prolog-hanoi/prolog-hanoi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
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
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HighlightModule,
    CommonModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FooterComponent,
    ContentComponent,
    HeaderComponent,
  ],
  exports: [RouterModule],
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // TODO auf die gebrauchten reduzieren
    library.addIconPacks(fas, fab);
  }
}
