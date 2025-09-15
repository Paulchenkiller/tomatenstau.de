import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { NgForOf } from '@angular/common';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, FaIconComponent, NgForOf, TranslateModule],
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
  highContrast = false;
  private prefersContrastMql: MediaQueryList | null = null;

  constructor(
    private router: Router,
    private library: FaIconLibrary,
    private translate: TranslateService,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    this.library.addIconPacks(fas, fab);
    this.router.events.subscribe(() => {
      this.menu = false;
    });
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });

    // Initialize high-contrast from user preference or OS setting
    try {
      const saved = localStorage.getItem('pref:high-contrast');
      if (saved === 'on') {
        this.highContrast = true;
      } else if (saved === 'off') {
        this.highContrast = false;
      } else if (typeof window !== 'undefined' && 'matchMedia' in window) {
        this.prefersContrastMql = window.matchMedia('(prefers-contrast: more)');
        this.highContrast = !!this.prefersContrastMql.matches;
        // React to OS changes only if no explicit preference saved
        this.prefersContrastMql.addEventListener?.('change', (e: MediaQueryListEvent) => {
          const explicit = localStorage.getItem('pref:high-contrast');
          if (!explicit) {
            this.highContrast = e.matches;
            this.applyHighContrast();
          }
        });
      }
    } catch {}
    this.applyHighContrast();
  }

  setLang(lang: 'en' | 'de'): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  toggleHighContrast(): void {
    this.highContrast = !this.highContrast;
    try {
      localStorage.setItem('pref:high-contrast', this.highContrast ? 'on' : 'off');
    } catch {}
    this.applyHighContrast();
  }

  private applyHighContrast(): void {
    try {
      if (this.highContrast) {
        this.doc.body.setAttribute('data-theme', 'hc');
      } else {
        if (this.doc.body.getAttribute('data-theme') === 'hc') {
          this.doc.body.removeAttribute('data-theme');
        }
      }
    } catch {}
  }

  clickEvent(): void {
    this.nav = !this.nav;
  }
}
