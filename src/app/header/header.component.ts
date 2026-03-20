import { Component, Inject, OnDestroy, isDevMode, DOCUMENT } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgForOf } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  readBrowserCookie,
  readBrowserStorage,
  writeBrowserCookie,
  writeBrowserStorage,
} from '../preferences/browser-preferences';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, FaIconComponent, NgForOf, TranslateModule],
})
export class HeaderComponent implements OnDestroy {
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
  currentLang = 'en';
  highContrast = false;
  private prefersContrastMql: MediaQueryList | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private translate: TranslateService,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: { lang: string }) => {
        this.currentLang = event.lang;
      });

    const cookieVal = this.readCookie('pref:high-contrast');
    if (cookieVal === 'on') {
      this.highContrast = true;
    } else if (cookieVal === 'off') {
      this.highContrast = false;
    } else {
      const saved = this.readLocalStorage('pref:high-contrast');
      if (saved === 'on') {
        this.highContrast = true;
      } else if (saved === 'off') {
        this.highContrast = false;
      } else if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        this.prefersContrastMql = window.matchMedia('(prefers-contrast: more)');
        this.highContrast = !!this.prefersContrastMql.matches;
        this.prefersContrastMql.addEventListener?.('change', (event: MediaQueryListEvent) => {
          const explicit = this.readLocalStorage('pref:high-contrast');
          const cookieExplicit = this.readCookie('pref:high-contrast');
          if (!explicit && !cookieExplicit) {
            this.highContrast = event.matches;
            this.applyHighContrast();
          }
        });
      }
    }

    this.applyHighContrast();
  }

  async setLang(lang: 'en' | 'de'): Promise<void> {
    this.translate.use(lang);
    this.writeLocalStorage('lang', lang);
    this.writeCookie('lang', lang, 365);
    try {
      await this.router.navigate([], {
        queryParams: { lang },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    } catch (error) {
      if (isDevMode()) {
        console.warn(`Failed to update lang query param to "${lang}".`, error);
      }
    }
  }

  toggleHighContrast(): void {
    this.highContrast = !this.highContrast;
    const value = this.highContrast ? 'on' : 'off';
    this.writeLocalStorage('pref:high-contrast', value);
    this.writeCookie('pref:high-contrast', value, 365);
    this.applyHighContrast();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyHighContrast(): void {
    if (this.highContrast) {
      this.doc.body.setAttribute('data-theme', 'hc');
    } else if (this.doc.body.getAttribute('data-theme') === 'hc') {
      this.doc.body.removeAttribute('data-theme');
    }
  }

  private readLocalStorage(key: string): string | null {
    return readBrowserStorage(
      typeof localStorage !== 'undefined' ? localStorage : undefined,
      key,
      (action, failingKey, error) => this.logStorageAccessError(action, failingKey, error),
    );
  }

  private writeLocalStorage(key: string, value: string): void {
    writeBrowserStorage(
      typeof localStorage !== 'undefined' ? localStorage : undefined,
      key,
      value,
      (action, failingKey, error) => this.logStorageAccessError(action, failingKey, error),
    );
  }

  private readCookie(name: string): string | null {
    return readBrowserCookie(this.doc, name, (action, failingName, error) =>
      this.logCookieAccessError(action, failingName, error),
    );
  }

  private writeCookie(name: string, value: string, days: number): void {
    writeBrowserCookie(this.doc, name, value, days, (action, failingName, error) =>
      this.logCookieAccessError(action, failingName, error),
    );
  }

  private logStorageAccessError(action: string, key: string, error: unknown): void {
    if (isDevMode()) {
      console.warn(`Failed to ${action} for "${key}".`, error);
    }
  }

  private logCookieAccessError(action: string, name: string, error: unknown): void {
    if (isDevMode()) {
      console.warn(`Failed to ${action} cookie "${name}".`, error);
    }
  }
}
