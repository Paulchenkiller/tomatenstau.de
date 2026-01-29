import { Component, Inject, DOCUMENT } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HeaderComponent, ContentComponent, FooterComponent, TranslateModule],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private router: Router,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    // Update meta on navigation and language changes
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.updateMeta();
      });

    this.translate.onLangChange.subscribe(() => {
      this.updateMeta();
    });
  }

  private updateMeta(): void {
    const url = this.router.url || '/';

    // Update document language attribute dynamically
    const currentLang = this.translate.currentLang || 'en';
    this.doc.documentElement.lang = currentLang;

    // Title: "<SiteName> – <Section>"
    const siteName = this.translate.instant('INDEX.NAME');
    const label = this.getTranslatedLabelForCurrentRoute();
    const title = label ? `${siteName} – ${label}` : siteName;
    this.title.setTitle(title);

    // Description per known route, falling back to a generic intro
    const descKey = this.getDescriptionKeyForUrl(url);
    const description = this.translate.instant(descKey);
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }

    // Open Graph meta tags for better social sharing
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({
      property: 'og:type',
      content: url === '/' || url === '' ? 'profile' : 'article',
    });
    this.meta.updateTag({ property: 'og:url', content: this.doc?.location?.href || '' });
    this.meta.updateTag({ property: 'og:site_name', content: siteName });

    // Twitter Card meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    // Canonical, hreflang, and structured data
    this.updateLinkTagsAndStructuredData();
  }

  private getTranslatedLabelForCurrentRoute(): string {
    // Use the deepest route's breadcrumb and normalize to NAV.* keys
    // Note: Router state isn't directly available here without traversal; we approximate by URL mapping
    const url = this.router.url || '/';
    const titleKey = this.getTitleKeyForUrl(url);
    return this.translate.instant(titleKey);
  }

  private getTitleKeyForUrl(url: string): string {
    // Map URLs to NAV.* or specific 404 title
    const clean = url.replace(/\/?$/, '');
    const map: Record<string, string> = {
      '': 'NAV.HOME',
      '/': 'NAV.HOME',
      '/404': '404.TITLE',
    };
    return map[clean] || 'NAV.HOME';
  }

  private getDescriptionKeyForUrl(url: string): string {
    const clean = url.replace(/\/?$/, '');
    const map: Record<string, string> = {
      '': 'INDEX.INTRO',
      '/': 'INDEX.INTRO',
      '/404': '404.SUBTITLE',
    };
    return map[clean] || 'INDEX.INTRO';
  }

  private updateLinkTagsAndStructuredData(): void {
    const origin = this.doc?.location?.origin || '';
    const path = this.normalizePath(this.router.url || '/');

    // Canonical URL (no query, no hash)
    const canonical = origin + path;
    this.ensureLinkTag('canonical-link', 'canonical', canonical);

    // hreflang alternates using ?lang parameter
    const enHref = `${canonical}?lang=en`;
    const deHref = `${canonical}?lang=de`;
    this.ensureLinkTag('hreflang-en', 'alternate', enHref, 'en');
    this.ensureLinkTag('hreflang-de', 'alternate', deHref, 'de');
    this.ensureLinkTag('hreflang-x-default', 'alternate', canonical, 'x-default');

    // JSON-LD: Breadcrumbs for all routes
    const breadcrumbJson = this.buildBreadcrumbJsonLd(origin, path);
    this.ensureJsonLd('ld-breadcrumb', breadcrumbJson);

    // JSON-LD: Person only on homepage
    if (this.isHome(path)) {
      const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: this.translate.instant('INDEX.NAME'),
        jobTitle: this.translate.instant('INDEX.TITLE'),
        url: origin + '/',
        sameAs: [
          'https://github.com/Paulchenkiller',
          'https://www.linkedin.com/in/meik-geldmacher',
          'https://www.xing.com/profile/Meik_Geldmacher',
        ],
      };
      this.ensureJsonLd('ld-person', person);
    } else {
      this.removeTagById('ld-person');
    }
  }

  private ensureLinkTag(id: string, rel: string, href: string, hreflang?: string): void {
    let el = this.doc.getElementById(id) as HTMLLinkElement | null;
    if (!el) {
      el = this.doc.createElement('link');
      el.id = id;
      el.rel = rel;
      if (hreflang) {
        el.hreflang = hreflang;
      }
      this.doc.head.appendChild(el);
    }
    el.rel = rel; // keep updated
    if (hreflang) {
      el.setAttribute('hreflang', hreflang);
    } else {
      el.removeAttribute('hreflang');
    }
    el.href = href;
  }

  private ensureJsonLd(id: string, data: any): void {
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  private removeTagById(id: string): void {
    const el = this.doc.getElementById(id);
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  private buildBreadcrumbJsonLd(origin: string, path: string): any {
    // Build cumulative paths: '/', '/code', '/code/xyz', ...
    const parts = path.split('/').filter(Boolean);
    const cumulative: string[] = [''];
    let current = '';
    for (const p of parts) {
      current += '/' + p;
      cumulative.push(current);
    }
    const itemListElement = cumulative.map((p, idx) => {
      const key = this.getTitleKeyForUrl(p || '/');
      const name = this.translate.instant(key);
      const item = origin + (p || '/');
      return { '@type': 'ListItem', position: idx + 1, name, item };
    });
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    };
  }

  private isHome(path: string): boolean {
    return path === '/' || path === '';
  }

  private normalizePath(url: string): string {
    // remove query/hash, ensure leading slash, no trailing slash except for root
    const u = url.split('#')[0]?.split('?')[0];
    if (!u || u === '/') return '/';
    let result = u.startsWith('/') ? u : '/' + u;
    if (result.length > 1 && result.endsWith('/')) {
      result = result.slice(0, -1);
    }
    return result;
  }
}
