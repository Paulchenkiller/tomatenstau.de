import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { NgForOf } from '@angular/common';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, FaIconComponent, NgForOf],
})
export class HeaderComponent {
  socialMedia = [
    { icon: ['fab', 'github'], link: 'https://github.com/Paulchenkiller' },
    {
      icon: ['fab', 'linkedin'],
      link: 'https://www.linkedin.com/in/meik-geldmacher',
    },
    {
      icon: ['fab', 'xing'],
      link: 'https://www.xing.com/profile/Meik_Geldmacher',
    },
  ];
  nav: any;
  menu = false;
  currentLang = 'en';

  constructor(
    private router: Router,
    private library: FaIconLibrary,
    private translate: TranslateService,
  ) {
    this.library.addIconPacks(fas, fab);
    this.router.events.subscribe(() => {
      this.menu = false;
    });
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  setLang(lang: 'en' | 'de'): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  clickEvent(): void {
    this.nav = !this.nav;
  }
}
