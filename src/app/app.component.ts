import { Component } from '@angular/core';
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
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private router: Router,
    private title: Title,
    private meta: Meta,
  ) {
    // Update meta on navigation and language changes
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.updateMeta());

    this.translate.onLangChange.subscribe(() => this.updateMeta());
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
    const clean = url.replace(/\/?$/,'');
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
    const clean = url.replace(/\/?$/,'');
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
}
