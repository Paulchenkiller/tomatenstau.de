import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject, of } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

class TranslateStub {
  public onLangChange = new Subject<{ lang: string }>();
  private lang: 'en' | 'de' = 'en';
  instant(key: string): string {
    // Return key for meta/title calls
    return key;
  }
  get(keys: string[]) {
    const dictEn: any = {
      'A11Y.COPY_CODE': 'Copy code to clipboard',
      'A11Y.COPIED': 'Copied!',
    };
    const dictDe: any = {
      'A11Y.COPY_CODE': 'Code in Zwischenablage kopieren',
      'A11Y.COPIED': 'Kopiert!',
    };
    const src = this.lang === 'en' ? dictEn : dictDe;
    const result: any = {};
    keys.forEach((k) => (result[k] = src[k] || k));
    return of(result);
  }
  switchTo(lang: 'en' | 'de') {
    this.lang = lang;
    this.onLangChange.next({ lang });
  }
  getDefaultLang() {
    return 'en';
  }
}

class RouterStub {
  public url = '/code/python';
  public events = new Subject<any>();
}

describe('AppComponent enhanceCodeBlocks and language change', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: RouterStub;
  let translate: TranslateStub;

  beforeEach(async () => {
    jest.useFakeTimers();
    router = new RouterStub();
    translate = new TranslateStub();

    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        Title,
        Meta,
        { provide: Router, useValue: router },
        { provide: TranslateService, useValue: translate },
      ],
    }).compileComponents();

    // Minimal template with two code blocks
    TestBed.overrideComponent(AppComponent, {
      set: {
        template: '<pre id="pre1"><code>foo()</code></pre><pre id="pre2"><code>bar()</code></pre>',
      },
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('injects accessible copy buttons and updates labels on language change', () => {
    // Trigger initial navigation end to run ngAfterViewInit/enhancements via route subscription
    router.events.next(new NavigationEnd(1, router.url, router.url));
    fixture.detectChanges();

    // Flush setTimeout(0) in subscriptions
    jest.runOnlyPendingTimers();

    const pre1 = document.querySelector('#pre1')!;
    const btn1 = pre1.querySelector('button.copy-btn') as HTMLButtonElement | null;
    expect(btn1).toBeTruthy();
    expect(btn1!.textContent).toBe('Copy code to clipboard');
    expect(btn1!.getAttribute('aria-label')).toBe('Copy code to clipboard');

    // Click should show feedback then revert
    btn1!.click();
    expect(btn1!.textContent).toBe('Copied!');
    expect(btn1!.getAttribute('aria-label')).toBe('Copied!');
    // Revert after timeout
    jest.advanceTimersByTime(1600);
    expect(btn1!.textContent).toBe('Copy code to clipboard');

    // Simulate language switch to German
    translate.switchTo('de');
    // Flush enhancement timer scheduled in onLangChange
    jest.runOnlyPendingTimers();

    const btn1After = pre1.querySelector('button.copy-btn') as HTMLButtonElement;
    expect(btn1After.textContent).toBe('Code in Zwischenablage kopieren');
    expect(btn1After.getAttribute('aria-label')).toBe('Code in Zwischenablage kopieren');
  });
});
