import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

class TranslateStub {
  public onLangChange = new Subject<{ lang: string }>();
  instant(key: string): string {
    return key;
  }
  getDefaultLang() {
    return 'en';
  }
}

class RouterStub {
  public url = '/code/python';
  public events = new Subject<any>();
}

describe('AppComponent meta and links', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: RouterStub;
  let title: Title;
  let meta: Meta;

  beforeEach(async () => {
    router = new RouterStub();

    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        Title,
        Meta,
        { provide: Router, useValue: router },
        { provide: TranslateService, useClass: TranslateStub },
      ],
    }).compileComponents();

    // Override template to avoid rendering child components with RouterLink, etc.
    TestBed.overrideComponent(AppComponent, { set: { template: '<div></div>' } });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Trigger initial navigation end to update meta
    router.events.next(new NavigationEnd(1, router.url, router.url));
    fixture.detectChanges();

    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  it('should compose translated title from site name and section label', () => {
    // With our Translate stub, instant(key) returns the key itself
    expect(document.title).toBe('INDEX.NAME – NAV.PYTHON');
  });

  it('should set translated description meta tag based on route', () => {
    const tag = meta.getTag('name="description"');
    expect(tag?.content).toBe('PYTHON.INDEX.INTRO');
  });

  it('should generate canonical and hreflang link tags', () => {
    const origin = window.location.origin;
    const canonical = document.getElementById('canonical-link') as HTMLLinkElement | null;
    expect(canonical).toBeTruthy();
    expect(canonical!.href).toBe(`${origin}/code/python`);

    const en = document.getElementById('hreflang-en') as HTMLLinkElement | null;
    const de = document.getElementById('hreflang-de') as HTMLLinkElement | null;
    const xd = document.getElementById('hreflang-x-default') as HTMLLinkElement | null;

    expect(en?.rel).toBe('alternate');
    expect(de?.rel).toBe('alternate');
    expect(xd?.rel).toBe('alternate');

    expect(en?.getAttribute('hreflang')).toBe('en');
    expect(de?.getAttribute('hreflang')).toBe('de');
    expect(xd?.getAttribute('hreflang')).toBe('x-default');

    expect(en?.href).toBe(`${origin}/code/python?lang=en`);
    expect(de?.href).toBe(`${origin}/code/python?lang=de`);
    expect(xd?.href).toBe(`${origin}/code/python`);
  });

  it('should inject BreadcrumbList JSON-LD on non-home routes and not inject Person', () => {
    const ldBreadcrumb = document.getElementById('ld-breadcrumb') as HTMLScriptElement | null;
    expect(ldBreadcrumb).toBeTruthy();
    const data =
      ldBreadcrumb && ldBreadcrumb.textContent ? JSON.parse(ldBreadcrumb.textContent) : null;
    expect(data && data['@type']).toBe('BreadcrumbList');

    const ldPerson = document.getElementById('ld-person');
    expect(ldPerson).toBeNull();
  });
});
