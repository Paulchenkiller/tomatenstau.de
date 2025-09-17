import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgForOf } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, FaIconComponent, NgForOf, TranslateModule],
})
export class HeaderComponent {
  socialMedia = [
    {
      icon: ['fab', 'github'],
      link: 'https://github.com/Paulchenkiller',
      name: 'GitHub',
    },
    {
      icon: ['fab', 'linkedin'],
      link: 'https://www.linkedin.com/in/meik-geldmacher',
      name: 'LinkedIn',
    },
    {
      icon: ['fab', 'xing'],
      link: 'https://www.xing.com/profile/Meik_Geldmacher',
      name: 'XING',
    },
  ];
  nav: any;
  menu = false;
  currentLang = 'en';
  highContrast = false;
  private prefersContrastMql: MediaQueryList | null = null;

  constructor(
    private router: Router,
    private iconService: IconService,
    private translate: TranslateService,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    // Icons are now loaded via the IconService
    this.router.events.subscribe(() => {
      this.menu = false;
    });
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });

    // Initialize high-contrast from cookie/localStorage or OS setting
    try {
      const cookieVal = this.readCookie('pref:high-contrast');
      if (cookieVal === 'on') {
        this.highContrast = true;
      } else if (cookieVal === 'off') {
        this.highContrast = false;
      } else {
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
            const cookieExplicit = this.readCookie('pref:high-contrast');
            if (!explicit && !cookieExplicit) {
              this.highContrast = e.matches;
              this.applyHighContrast();
            }
          });
        }
      }
    } catch {}
    this.applyHighContrast();
  }

  setLang(lang: 'en' | 'de'): void {
    this.translate.use(lang);
    try {
      localStorage.setItem('lang', lang);
    } catch {}
    // Also persist in a cookie to better survive environments resetting localStorage
    try {
      this.writeCookie('lang', lang, 365);
    } catch {}
    // Reflect chosen language in the URL (?lang=xx) so reloads honor the selection
    try {
      this.router.navigate([], {
        queryParams: { lang },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    } catch {}
  }

  toggleHighContrast(): void {
    this.highContrast = !this.highContrast;
    const val = this.highContrast ? 'on' : 'off';
    try {
      localStorage.setItem('pref:high-contrast', val);
    } catch {}
    // Also persist in a cookie to survive aggressive localStorage resets (e.g., in certain environments)
    try {
      this.writeCookie('pref:high-contrast', val, 365);
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

  private readCookie(name: string): string | null {
    try {
      const nameEQ = name + '=';
      const parts = (this.doc.cookie || '').split(';');
      for (let c of parts) {
        c = c.trim();
        if (c.startsWith(nameEQ)) {
          return decodeURIComponent(c.substring(nameEQ.length));
        }
      }
    } catch {}
    return null;
  }

  private writeCookie(name: string, value: string, days: number): void {
    try {
      const maxAge = days > 0 ? `; max-age=${days * 24 * 60 * 60}` : '';
      this.doc.cookie = `${name}=${encodeURIComponent(value)}; path=/${maxAge}`;
    } catch {}
  }

  clickEvent(): void {
    this.nav = !this.nav;
  }
}
