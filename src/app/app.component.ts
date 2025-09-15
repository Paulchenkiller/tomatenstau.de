import { Component, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, ContentComponent, FooterComponent],
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
    const url = this.router.url || '/';

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
      '/code': 'NAV.CODE',
      '/code/perl': 'NAV.PERL',
      '/code/perl/regex-greediness': 'NAV.REGEX_GREEDY_LAZY',
      '/code/perl/context': 'NAV.CONTEXT',
      '/code/python': 'NAV.PYTHON',
      '/code/python/mutable-default': 'NAV.MUTABLE_DEFAULT',
      '/code/python/gil-threads': 'NAV.GIL_THREADS',
      '/code/java': 'NAV.JAVA',
      '/code/java/equals-hashcode': 'NAV.EQUALS_HASHCODE',
      '/code/java/concurrent-modification': 'NAV.CONCURRENT_MODIFICATION',
      '/code/javascript': 'NAV.JAVASCRIPT',
      '/code/javascript/closures-scope': 'NAV.CLOSURES_SCOPE',
      '/code/javascript/hoisting-tdz': 'NAV.HOISTING_TDZ',
      '/code/javascript/async-await': 'NAV.ASYNC_AWAIT',
      '/code/javascript/this-arrow': 'NAV.THIS_ARROW',
      '/code/javascript/ts-structural-typing': 'NAV.TS_STRUCTURAL_TYPING',
      '/code/haskell': 'NAV.HASKELL',
      '/code/haskell/purity-io': 'NAV.PURITY_IO',
      '/code/haskell/lazy-evaluation': 'NAV.LAZY_EVALUATION',
      '/code/haskell/typeclasses': 'NAV.TYPECLASSES',
      '/code/haskell/monads': 'NAV.MONADS',
      '/code/haskell/pattern-matching': 'NAV.PATTERN_MATCHING',
      '/code/prolog': 'NAV.PROLOG',
      '/code/prolog/ackermann': 'NAV.ACKERMANN',
      '/code/prolog/hanoi': 'NAV.HANOI',
      '/404': '404.TITLE',
    };
    return map[clean] || 'NAV.HOME';
  }

  private getDescriptionKeyForUrl(url: string): string {
    const clean = url.replace(/\/?$/, '');
    const map: Record<string, string> = {
      '': 'INDEX.INTRO',
      '/': 'INDEX.INTRO',
      '/code': 'CODE.INTRO',
      '/code/perl': 'PERL.INDEX.INTRO',
      '/code/perl/regex-greediness': 'PERL.REGEX.INTRO',
      '/code/perl/context': 'PERL.CONTEXT.INTRO',
      '/code/python': 'PYTHON.INDEX.INTRO',
      '/code/python/mutable-default': 'PYTHON.MUTABLE_DEFAULT.INTRO',
      '/code/python/gil-threads': 'PYTHON.GIL_THREADS.INTRO',
      '/code/java': 'JAVA.INDEX.INTRO',
      '/code/java/equals-hashcode': 'JAVA.EQUALS_HASHCODE.INTRO',
      '/code/java/concurrent-modification': 'JAVA.CONCURRENT.INTRO',
      '/code/javascript': 'JAVASCRIPT.INDEX.INTRO',
      '/code/javascript/closures-scope': 'JAVASCRIPT.CLOSURES.INTRO',
      '/code/javascript/hoisting-tdz': 'JAVASCRIPT.HOISTING.INTRO',
      '/code/javascript/async-await': 'JAVASCRIPT.ASYNC.INTRO',
      '/code/javascript/this-arrow': 'JAVASCRIPT.THIS.INTRO',
      '/code/javascript/ts-structural-typing': 'JAVASCRIPT.TS.INTRO',
      '/code/haskell': 'HASKELL.INDEX.INTRO',
      '/code/haskell/purity-io': 'HASKELL.PURITY.INTRO',
      '/code/haskell/lazy-evaluation': 'HASKELL.LAZY.INTRO',
      '/code/haskell/typeclasses': 'HASKELL.TYPECLASSES.INTRO',
      '/code/haskell/monads': 'HASKELL.MONADS.INTRO',
      '/code/haskell/pattern-matching': 'HASKELL.PATTERN.INTRO',
      '/code/prolog': 'PROLOG.INDEX.INTRO',
      '/code/prolog/ackermann': 'PROLOG.ACKERMANN.P1',
      '/code/prolog/hanoi': 'PROLOG.HANOI.P1',
      '/404': '404.SUBTITLE',
    };
    return map[clean] || 'INDEX.INTRO';
  }

  private updateLinkTagsAndStructuredData(): void {
    const fullUrl = this.doc?.location?.href || '';
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

  // Enhance code blocks: add accessible "Copy" buttons with i18n labels and keyboard support
  private enhanceCodeBlocks(): void {
    try {
      this.translate.get(['A11Y.COPY_CODE', 'A11Y.COPIED']).subscribe((dict) => {
        const tCopy = dict['A11Y.COPY_CODE'] || 'Copy code to clipboard';
        const tCopied = dict['A11Y.COPIED'] || 'Copied!';
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
            btn.addEventListener('click', () => this.copyCode(pre, code, btn!, tCopy, tCopied));
            // Key accessibility: button already handles Enter/Space by default; no extra needed
            pre.appendChild(btn);
          }
          // Always update labels/text on language change
          btn.setAttribute('aria-label', tCopy);
          btn.title = tCopy;
          btn.textContent = tCopy;
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
    const u = url.split('#')[0].split('?')[0];
    if (!u || u === '/') return '/';
    let result = u.startsWith('/') ? u : '/' + u;
    if (result.length > 1 && result.endsWith('/')) {
      result = result.slice(0, -1);
    }
    return result;
  }
}
