import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {ServicesComponent} from './services/services.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {FormsModule} from '@angular/forms';
import {IndexComponent} from './index/index.component';
import {CardComponent} from './card/card.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ModalComponent} from './modal/modal.component';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {ContentComponent} from './content/content.component';
import {HeadlineComponent} from './headline/headline.component';
import {MemberComponent} from './member/member.component';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import {CodeComponent} from './code/code.component';
import {PrologIndexComponent} from './code/prolog/prolog-index/prolog-index.component';
import {PerlIndexComponent} from './code/perl/perl-index/perl-index.component';
import {PythonIndexComponent} from './code/python/python-index/python-index.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {CommonModule} from '@angular/common';
import {PrologAckermannComponent} from './code/prolog/prolog-ackermann/prolog-ackermann.component';
import {PrologHanoiComponent} from './code/prolog/prolog-hanoi/prolog-hanoi.component';

const routes: Routes = [
  {path: 'index', component: IndexComponent, data: {breadcrumb: 'Home', logo: 'home'}},
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {
    path    : 'code', data: {breadcrumb: 'Code', logo: 'terminal'},
    children: [
      {path: '', component: CodeComponent},
      {
        path    : 'perl', data: {breadcrumb: 'Perl', logo: 'keyboard'},
        children: [{path: '', component: PerlIndexComponent}]
      },
      {
        path    : 'python', data: {breadcrumb: 'Python', logo: ['fab', 'python']},
        children: [{component: PythonIndexComponent, path: ''}]
      },
      {
        path    : 'prolog', data: {breadcrumb: 'Prolog', logo: 'brain'},
        children: [
          {path: '', component: PrologIndexComponent},
          {
            path    : 'ackermann', data: {breadcrumb: 'Ackermann', logo: 'superscript'},
            children: [
              {path: '', component: PrologAckermannComponent}
            ]
          },
          {
            path    : 'hanoi', data: {breadcrumb: 'Hanoi', logo: 'gopuram'},
            children: [
              {path: '', component: PrologHanoiComponent}
            ]
          },
        ]
      }
    ]
  },
  // {path: 'about', component: AboutComponent},
  // {path: 'contact', component: ContactComponent},
  // {path: 'portfolio', component: PortfolioComponent},
  // {path: 'services', component: ServicesComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule( {
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    PortfolioComponent,
    ServicesComponent,
    AboutComponent,
    ContactComponent,
    IndexComponent,
    CardComponent,
    ModalComponent,
    ContentComponent,
    HeadlineComponent,
    MemberComponent,
    CodeComponent,
    PrologIndexComponent,
    PerlIndexComponent,
    PythonIndexComponent,
    BreadcrumbComponent,
    PrologAckermannComponent,
    PrologHanoiComponent
  ],
  imports     : [
    BrowserModule,
    RouterModule.forRoot( routes ),
    FormsModule,
    HighlightModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports     : [RouterModule],
  providers   : [{
    provide : HIGHLIGHT_OPTIONS,
    useValue: {
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
      languages        : {
        perl  : () => import('highlight.js/lib/languages/perl'),
        python: () => import('highlight.js/lib/languages/python'),
        prolog: () => import('highlight.js/lib/languages/prolog'),
        // matlab: () => import('highlight.js/lib/languages/matlab'),
        // shell : () => import('highlight.js/lib/languages/shell'),
      }
    }
  }],
  bootstrap   : [AppComponent]
} )
export class AppModule {
  constructor( library: FaIconLibrary ) {
    // TODO auf die gebrauchten reduzieren
    library.addIconPacks( fas, fab );
    // library.addIcons(faGithub);
  }
}
