import { Component, ViewEncapsulation } from '@angular/core';
import { Breadcrumb } from './breadcrumb';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Observable } from 'rxjs';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, NgIf, FaIconComponent, AsyncPipe, NgForOf, TranslateModule],
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;

  // Map legacy breadcrumb labels to new neutral NAV.* keys
  private navKeyMap: Record<string, string> = {
    Home: 'NAV.HOME',
    Code: 'NAV.CODE',
    Perl: 'NAV.PERL',
    'Regex Greedy/Lazy': 'NAV.REGEX_GREEDY_LAZY',
    Kontext: 'NAV.CONTEXT',
    Python: 'NAV.PYTHON',
    'Mutable Default': 'NAV.MUTABLE_DEFAULT',
    'GIL & Threads': 'NAV.GIL_THREADS',
    Java: 'NAV.JAVA',
    'equals & hashCode': 'NAV.EQUALS_HASHCODE',
    ConcurrentModification: 'NAV.CONCURRENT_MODIFICATION',
    'JavaScript/TypeScript': 'NAV.JAVASCRIPT',
    'Closures & Scope': 'NAV.CLOSURES_SCOPE',
    'Hoisting & TDZ': 'NAV.HOISTING_TDZ',
    'async/await': 'NAV.ASYNC_AWAIT',
    'this & Arrow': 'NAV.THIS_ARROW',
    'TS Structural Typing': 'NAV.TS_STRUCTURAL_TYPING',
    Haskell: 'NAV.HASKELL',
    'Purity & IO': 'NAV.PURITY_IO',
    'Lazy Evaluation': 'NAV.LAZY_EVALUATION',
    Typeclasses: 'NAV.TYPECLASSES',
    Monaden: 'NAV.MONADS',
    'Pattern Matching': 'NAV.PATTERN_MATCHING',
    Prolog: 'NAV.PROLOG',
    Ackermann: 'NAV.ACKERMANN',
    Hanoi: 'NAV.HANOI',
  };

  private normalizeNavKey(raw: string): string {
    if (!raw) {
      return 'NAV.HOME';
    }
    if (raw.startsWith('NAV.')) {
      return raw;
    }
    return this.navKeyMap[raw] ?? raw;
  }

  // Build your breadcrumb starting with the root route of your current activated route
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.breadcrumbs$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map((_event) => this.buildBreadCrumb(this.activatedRoute.root)),
    );
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    givenUrl = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    const rawLabel = route?.routeConfig?.data?.breadcrumb ?? 'NAV.HOME';
    const keyOrLabel = this.normalizeNavKey(rawLabel);
    const label = this.translate.instant(keyOrLabel);
    const logo = route?.routeConfig?.data?.logo ?? 'home';
    const path = route?.routeConfig?.path ?? '';
    // Avoid generating double slashes when encountering empty path segments
    let url = givenUrl;
    if (path) {
      url = `${givenUrl}${path}/`;
    } else if (!givenUrl) {
      // root
      url = '/';
    }
    const breadcrumb = { label, logo, url };
    const newBreadcrumbs = [breadcrumb, ...breadcrumbs];
    if (route.firstChild && route.children.length && route.children[0]?.firstChild) {
      return this.buildBreadCrumb(route.firstChild, url, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
