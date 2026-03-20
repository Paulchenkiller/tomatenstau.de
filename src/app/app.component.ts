import { Component, Inject, AfterViewInit, DOCUMENT } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
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
export class AppComponent implements AfterViewInit {
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
        // Defer enhancement to allow content rendering
        setTimeout(() => this.enhanceCodeBlocks(), 0);
      });

    this.translate.onLangChange.subscribe(() => {
      this.updateMeta();
      // Update button labels when language changes
      setTimeout(() => this.enhanceCodeBlocks(), 0);
    });
  }

  ngAfterViewInit(): void {
    // Initial enhancement after the first view is ready
    setTimeout(() => this.enhanceCodeBlocks(), 0);
  }

  private updateMeta(): void {
    const url = normalizeAppPath(this.router.url || '/');
    const activeRouteMeta = getDeepestRouteMeta(this.router.routerState?.snapshot?.root, url);
    const activeChain = getActiveRouteMetaChain(this.router.routerState?.snapshot?.root, url);

    // Update document language attribute dynamically
    const currentLang = this.translate.currentLang || 'en';
    this.doc.documentElement.lang = currentLang;

    // Title: "<SiteName> – <Section>"
    const siteName = this.translate.instant('INDEX.NAME');
    const label = this.translate.instant(activeRouteMeta?.meta.titleKey || 'NAV.HOME');
    const title = label ? `${siteName} – ${label}` : siteName;
    this.title.setTitle(title);

    // Description per known route, falling back to a generic intro
    const descKey = activeRouteMeta?.meta.descriptionKey || 'INDEX.INTRO';
    const description = this.translate.instant(descKey);
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }

    // Open Graph meta tags for better social sharing
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({
      property: 'og:type',
      content: activeRouteMeta?.meta.schemaType || 'article',
    });
    this.meta.updateTag({ property: 'og:url', content: this.doc?.location?.href || '' });
    this.meta.updateTag({ property: 'og:site_name', content: siteName });

    // Twitter Card meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    // Canonical, hreflang, and structured data
    this.updateLinkTagsAndStructuredData(url, activeChain);
  }

  private updateLinkTagsAndStructuredData(
    path: string,
    activeChain = getActiveRouteMetaChain(this.router.routerState?.snapshot?.root, path),
  ): void {
    const origin = this.doc?.location?.origin || '';

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
    const breadcrumbJson = this.buildBreadcrumbJsonLd(origin, activeChain);
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

  // Enhance code blocks: add accessible "Copy" buttons with i18n labels and keyboard support
  private enhanceCodeBlocks(): void {
    try {
      // Fallback labels for immediate accessibility, even before translations load
      const fallbackCopy = 'Copy code to clipboard';
      const fallbackCopied = 'Copied!';

      const pres = Array.from(this.doc.querySelectorAll('pre')) as HTMLPreElement[];
      for (const pre of pres) {
        const code = pre.querySelector('code');
        if (!code) continue;

        // Ensure pre is relatively positioned for optional button positioning via CSS (non-destructive)
        if (!pre.style.position) {
          // don't override existing author styles
          pre.style.position = 'relative';
        }

        let btn = pre.querySelector('button.copy-btn') as HTMLButtonElement | null;
        if (!btn) {
          btn = this.doc.createElement('button');
          btn.type = 'button';
          btn.className = 'copy-btn';
          // default placement can be adjusted via CSS
          btn.style.position = 'absolute';
          btn.style.top = '0.5rem';
          btn.style.right = '0.5rem';

          // Set immediate accessibility attributes with fallback values
          btn.setAttribute('aria-label', fallbackCopy);
          btn.title = fallbackCopy;
          btn.textContent = fallbackCopy;
          btn.setAttribute('type', 'button');
          btn.setAttribute('role', 'button');

          btn.addEventListener('click', () => {
            // Use direct fallbacks to ensure feedback always works
            const currentCopy = btn!.getAttribute('aria-label') || fallbackCopy;
            this.copyCode(pre, code, btn!, currentCopy, fallbackCopied);
          });

          // Key accessibility: button already handles Enter/Space by default; no extra needed
          pre.appendChild(btn);
        }
      }

      // After initial setup, try to get translations and update labels
      this.translate.get(['A11Y.COPY_CODE', 'A11Y.COPIED']).subscribe((dict) => {
        const tCopy = dict['A11Y.COPY_CODE'] || fallbackCopy;
        const _tCopied = dict['A11Y.COPIED'] || fallbackCopied;

        const buttons = Array.from(
          this.doc.querySelectorAll('button.copy-btn'),
        ) as HTMLButtonElement[];
        for (const btn of buttons) {
          // Ensure button always has text - use fallback if translation is empty
          const finalCopy = tCopy && tCopy.trim() ? tCopy : fallbackCopy;
          btn.setAttribute('aria-label', finalCopy);
          btn.title = finalCopy;
          btn.textContent = finalCopy;
        }
      });
    } catch {
      // no-op: DOM not ready or no document (SSR)
    }
  }

  private async copyCode(
    pre: HTMLPreElement,
    codeEl: Element,
    btn: HTMLButtonElement,
    tCopy: string,
    tCopied: string,
  ): Promise<void> {
    const text = codeEl.textContent || '';
    try {
      if (navigator && 'clipboard' in navigator && (navigator as any).clipboard?.writeText) {
        await (navigator as any).clipboard.writeText(text);
      } else {
        const ta = this.doc.createElement('textarea');
        ta.value = text;
        // Off-screen copy aid
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        this.doc.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
          this.doc.execCommand('copy');
        } catch {}
        this.doc.body.removeChild(ta);
      }
    } catch {
      // ignore copy errors
    } finally {
      // Always provide user feedback regardless of copy API availability
      btn.setAttribute('aria-label', tCopied);
      btn.textContent = tCopied;
      setTimeout(() => {
        btn.setAttribute('aria-label', tCopy);
        btn.textContent = tCopy;
      }, 1500);
    }
  }

  private removeTagById(id: string): void {
    const el = this.doc.getElementById(id);
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  private buildBreadcrumbJsonLd(
    origin: string,
    activeChain: ReturnType<typeof getActiveRouteMetaChain>,
  ): any {
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
