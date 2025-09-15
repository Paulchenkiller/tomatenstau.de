import { BreadcrumbComponent } from './breadcrumb.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

class TranslateStub {
  public currentLang = 'en';
  public onLangChange = new Subject<{ lang: string }>();
  instant(key: string): string {
    // For testing we simply return the key to assert normalization
    return key;
  }
  use(lang: string) {
    this.currentLang = lang;
    this.onLangChange.next({ lang });
  }
}

function makeRouteTree(): any /* ActivatedRoute */ {
  // Build a fake route tree roughly like: /code/python
  const pythonLeaf: any = {
    routeConfig: { path: '', data: { breadcrumb: 'Python', logo: 'code' } },
    children: [],
    firstChild: null,
  };

  const python: any = {
    routeConfig: { path: 'python', data: { breadcrumb: 'Python', logo: 'code' } },
    children: [pythonLeaf],
    firstChild: pythonLeaf,
  };

  const codeLeaf: any = {
    routeConfig: { path: '', data: { breadcrumb: 'Code', logo: 'terminal' } },
    children: [python],
    firstChild: python,
  };

  const code: any = {
    routeConfig: { path: 'code', data: { breadcrumb: 'Code', logo: 'terminal' } },
    children: [codeLeaf],
    firstChild: codeLeaf,
  };

  const root: any = {
    routeConfig: { path: '', data: { breadcrumb: 'Home', logo: 'home' } },
    children: [code],
    firstChild: code,
  };

  return root as ActivatedRoute;
}

function makeRouteTreeWithNavKey(): any /* ActivatedRoute */ {
  const leaf: any = {
    routeConfig: { path: '', data: { breadcrumb: 'NAV.JAVA', logo: 'mug-hot' } },
    children: [],
    firstChild: null,
  };
  const java: any = {
    routeConfig: { path: 'java', data: { breadcrumb: 'NAV.JAVA', logo: 'mug-hot' } },
    children: [leaf],
    firstChild: leaf,
  };
  const code: any = {
    routeConfig: { path: 'code', data: { breadcrumb: 'Code', logo: 'terminal' } },
    children: [java],
    firstChild: java,
  };
  const root: any = {
    routeConfig: { path: '', data: { breadcrumb: 'Home', logo: 'home' } },
    children: [code],
    firstChild: code,
  };
  return root as ActivatedRoute;
}

describe('BreadcrumbComponent', () => {
  let router: Partial<Router> & { events: Subject<any> };
  let translate: TranslateStub;

  beforeEach(() => {
    router = { events: new Subject() } as any;
    translate = new TranslateStub();
  });

  it('should normalize legacy labels to NAV.* keys and translate them', () => {
    const comp = new BreadcrumbComponent(makeRouteTree(), router as any, translate as any);

    const crumbs = comp.buildBreadCrumb(makeRouteTree());
    // Expect four crumbs due to intermediate empty-path nodes: Home, Code, Code (''), Python
    expect(crumbs.length).toBe(4);
    const labels = crumbs.map((c) => c.label);
    expect(labels).toContain('NAV.HOME');
    expect(labels).toContain('NAV.CODE');
    expect(labels).toContain('NAV.PYTHON');

    // And URLs should be cumulative with trailing slashes (order-agnostic)
    const urls = crumbs.map((c) => c.url);
    expect(urls).toContain('/');
    expect(urls).toContain('/code/');
    expect(urls).toContain('/code/python/');
  });

  it('should accept already normalized NAV.* breadcrumb keys as-is', () => {
    const comp = new BreadcrumbComponent(
      makeRouteTreeWithNavKey(),
      router as any,
      translate as any,
    );

    const crumbs = comp.buildBreadCrumb(makeRouteTreeWithNavKey());
    // Expect three crumbs here (root, code, java). Leaf with empty path is not included by recursion condition
    expect(crumbs.length).toBe(3);
    const labels = crumbs.map((c) => c.label);
    expect(labels).toContain('NAV.JAVA');
  });
});
