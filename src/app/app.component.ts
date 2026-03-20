import { Component, Inject, OnDestroy, DOCUMENT } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  getActiveRouteMetaChain,
  getDeepestRouteMeta,
  normalizeAppPath,
} from './routing/route-meta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HeaderComponent, ContentComponent, FooterComponent, TranslateModule],
})
export class AppComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private router: Router,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.updateMeta();
      });

    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateMeta();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateMeta(): void {
    const url = normalizeAppPath(this.router.url || '/');
    const activeRouteMeta = getDeepestRouteMeta(this.router.routerState?.snapshot?.root, url);
    const activeChain = getActiveRouteMetaChain(this.router.routerState?.snapshot?.root, url);

    const currentLang = this.translate.currentLang || 'en';
    this.doc.documentElement.lang = currentLang;

    const siteName = this.translate.instant('INDEX.NAME');
    const label = this.translate.instant(activeRouteMeta?.meta.titleKey || 'NAV.HOME');
    const title = label ? `${siteName} – ${label}` : siteName;
    this.title.setTitle(title);

    const descKey = activeRouteMeta?.meta.descriptionKey || 'INDEX.INTRO';
    const description = this.translate.instant(descKey);
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({
      property: 'og:type',
      content: activeRouteMeta?.meta.schemaType || 'article',
    });
    this.meta.updateTag({ property: 'og:url', content: this.doc?.location?.href || '' });
    this.meta.updateTag({ property: 'og:site_name', content: siteName });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    this.updateLinkTagsAndStructuredData(url, activeChain);
  }

  private updateLinkTagsAndStructuredData(
    path: string,
    activeChain = getActiveRouteMetaChain(this.router.routerState?.snapshot?.root, path),
  ): void {
    const origin = this.doc?.location?.origin || '';
    const canonical = origin + path;

    this.ensureLinkTag('canonical-link', 'canonical', canonical);
    this.ensureLinkTag('hreflang-en', 'alternate', `${canonical}?lang=en`, 'en');
    this.ensureLinkTag('hreflang-de', 'alternate', `${canonical}?lang=de`, 'de');
    this.ensureLinkTag('hreflang-x-default', 'alternate', canonical, 'x-default');

    const breadcrumbJson = this.buildBreadcrumbJsonLd(origin, activeChain);
    this.ensureJsonLd('ld-breadcrumb', breadcrumbJson);

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
    let element = this.doc.getElementById(id) as HTMLLinkElement | null;
    if (!element) {
      element = this.doc.createElement('link');
      element.id = id;
      element.rel = rel;
      if (hreflang) {
        element.hreflang = hreflang;
      }
      this.doc.head.appendChild(element);
    }

    element.rel = rel;
    if (hreflang) {
      element.setAttribute('hreflang', hreflang);
    } else {
      element.removeAttribute('hreflang');
    }
    element.href = href;
  }

  private ensureJsonLd(id: string, data: unknown): void {
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
    const element = this.doc.getElementById(id);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  private buildBreadcrumbJsonLd(
    origin: string,
    activeChain: ReturnType<typeof getActiveRouteMetaChain>,
  ): unknown {
    const itemListElement = activeChain.map(({ meta, url }, idx) => {
      const name = this.translate.instant(meta.breadcrumbKey);
      const item = origin + url;
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
}
