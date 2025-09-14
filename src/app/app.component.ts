import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, ContentComponent, FooterComponent],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('en');
    const saved = localStorage.getItem('lang');
    const browserLang = navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
    const lang = saved || browserLang;
    this.translate.use(lang);
  }
}
