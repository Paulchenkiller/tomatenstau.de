import { Component, ViewEncapsulation } from '@angular/core';
import { Breadcrumb } from './breadcrumb';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterLink,
    NgIf,
    FaIconComponent,
    AsyncPipe,
    RouterLinkActive,
    NgForOf,
  ],
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;

  // Build your breadcrumb starting with the root route of your current activated route
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
    const label = route?.routeConfig?.data?.breadcrumb ?? 'Home';
    const logo = route?.routeConfig?.data?.logo ?? 'home';
    const path = route?.routeConfig?.path ?? '';
    const url = `${givenUrl}${path}/`;
    const breadcrumb = { label, logo, url };
    const newBreadcrumbs = [breadcrumb, ...breadcrumbs];
    if (
      route.firstChild &&
      route.children.length &&
      route.children[0].firstChild
    ) {
      return this.buildBreadCrumb(route.firstChild, url, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
