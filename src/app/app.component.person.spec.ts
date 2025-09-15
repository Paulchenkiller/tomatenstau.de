import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject, of } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

class TranslateStub {
  public onLangChange = new Subject<{ lang: string }>();
  instant(key: string): string {
    return key;
  }
  get(keys: string[]) {
    // return labels used by enhanceCodeBlocks
    const dict: any = {
      'A11Y.COPY_CODE': 'Copy code to clipboard',
      'A11Y.COPIED': 'Copied!',
    };
    const result: any = {};
    keys.forEach((k) => (result[k] = dict[k] || k));
    return of(result);
  }
  getDefaultLang() {
    return 'en';
  }
}

class RouterStub {
  public url = '/';
  public events = new Subject<any>();
}

describe('AppComponent person JSON-LD and normalizePath', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: RouterStub;

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

    // Provide a minimal template that includes a code block to allow enhanceCodeBlocks to work
    TestBed.overrideComponent(AppComponent, {
      set: { template: '<pre><code>console.log(1)</code></pre>' },
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('injects Person JSON-LD on home and removes it on non-home; canonical normalizes trailing slash', () => {
    // On home
    router.url = '/';
    router.events.next(new NavigationEnd(1, router.url, router.url));
    fixture.detectChanges();

    const ldPerson1 = document.getElementById('ld-person') as HTMLScriptElement | null;
    expect(ldPerson1).toBeTruthy();
    const personObj = ldPerson1 && ldPerson1.textContent ? JSON.parse(ldPerson1.textContent) : null;
    expect(personObj && personObj['@type']).toBe('Person');

    // Navigate to "/code/" (with trailing slash) to exercise normalizePath trimming
    router.url = '/code/';
    router.events.next(new NavigationEnd(2, router.url, router.url));
    fixture.detectChanges();

    const origin = window.location.origin;
    const canonical = document.getElementById('canonical-link') as HTMLLinkElement | null;
    expect(canonical).toBeTruthy();
    expect(canonical!.href).toBe(`${origin}/code`);

    // Person JSON-LD should be removed off home
    const ldPerson2 = document.getElementById('ld-person');
    expect(ldPerson2).toBeNull();
  });
});
