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

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'code', component: CodeComponent},
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
    CodeComponent
  ],
  imports     : [
    BrowserModule,
    RouterModule.forRoot( routes ),
    FormsModule,
    HighlightModule,
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
        prolog: () => import('highlight.js/lib/languages/prolog')
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
