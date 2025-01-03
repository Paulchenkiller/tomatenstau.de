import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Breadcrumb} from './breadcrumb';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component( {
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
} )
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$ = this.router.events.pipe(
    filter( event => event instanceof NavigationEnd ),
    distinctUntilChanged(),
    map( event => this.buildBreadCrumb( this.activatedRoute.root ) )
  );

  // Build your breadcrumb starting with the root route of your current activated route
  constructor( private activatedRoute: ActivatedRoute,
               private router: Router ) {
  }

  ngOnInit() {
  }

  buildBreadCrumb( route: ActivatedRoute, givenUrl: string = '',
                   breadcrumbs: Array<Breadcrumb> = [] ): Array<Breadcrumb> {
    const label = route?.routeConfig?.data?.breadcrumb ?? 'Home';
    const logo = route?.routeConfig?.data?.logo ?? 'home';
    const path = route?.routeConfig?.path ?? '';
    const url = `${givenUrl}${path}/`;
    const breadcrumb = {label, logo, url};
    const newBreadcrumbs = [breadcrumb, ...breadcrumbs];
    if ( route.firstChild && route.children.length && route.children[0].firstChild ) {
      return this.buildBreadCrumb( route.firstChild, url, newBreadcrumbs );
    }
    return newBreadcrumbs;
  }
}
