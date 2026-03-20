import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

type MockBody = Pick<HTMLElement, 'getAttribute' | 'removeAttribute' | 'setAttribute'>;
type MockDocument = Pick<Document, 'cookie'> & { body: MockBody };
type MockRouter = { navigate: jest.Mock<Promise<boolean>, [unknown?, unknown?]> };
type HeaderComponentWithState = HeaderComponent & { highContrast: boolean };
type MockMediaQueryList = Pick<MediaQueryList, 'matches'> & {
  addEventListener: jest.Mock<void, [string, (event: MediaQueryListEvent) => void]>;
};
type WritableMatchMediaWindow = Window & { matchMedia: typeof window.matchMedia | undefined };

class TranslateStub {
  public currentLang = 'en';
  public onLangChange = new Subject<LangChangeEvent>();
  use = jest.fn((lang: string) => {
    this.currentLang = lang;
    this.emitLangChange(lang);
  });
  getDefaultLang() {
    return 'en';
  }
  emitLangChange(lang: string) {
    this.onLangChange.next({
      lang,
      translations: {},
    });
  }
}

function createMockDocument(initCookie = ''): MockDocument {
  const attrs: Record<string, string> = {};
  const body = {
    setAttribute: (n: string, v: string) => {
      attrs[n] = v;
    },
    removeAttribute: (n: string) => {
      delete attrs[n];
    },
    getAttribute: (n: string) => attrs[n] ?? null,
  };
  const doc = {
    body,
    cookie: initCookie,
  };
  return doc;
}

function createComponent(
  router: MockRouter,
  translate: TranslateStub,
  doc: MockDocument,
): HeaderComponent {
  return new HeaderComponent(
    router as unknown as Router,
    translate as unknown as TranslateService,
    doc as Document,
  );
}

describe('HeaderComponent', () => {
  let router: MockRouter;
  let translate: TranslateStub;
  let origLocalStorage: Storage | undefined;
  let origMatchMedia: typeof window.matchMedia | undefined;
  let mutableWindow: WritableMatchMediaWindow;

  beforeEach(() => {
    router = { navigate: jest.fn().mockResolvedValue(true) };
    translate = new TranslateStub();
    mutableWindow = window as WritableMatchMediaWindow;

    // Mock localStorage
    origLocalStorage = globalThis.localStorage;
    const store: Record<string, string> = {};
    const mockLocalStorage = {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
      removeItem: (k: string) => {
        delete store[k];
      },
      clear: () => {
        Object.keys(store).forEach((k) => delete store[k]);
      },
      key: (i: number) => Object.keys(store)[i] ?? null,
      length: 0,
    } as unknown as Storage;
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockLocalStorage,
      configurable: true,
    });

    // Save and clear matchMedia by default
    origMatchMedia = mutableWindow.matchMedia;
    (mutableWindow as { matchMedia: typeof window.matchMedia | undefined }).matchMedia = undefined;
  });

  afterEach(() => {
    // Restore localStorage
    if (origLocalStorage) {
      Object.defineProperty(globalThis, 'localStorage', {
        value: origLocalStorage,
        configurable: true,
      });
    }
    // Restore matchMedia
    (mutableWindow as { matchMedia: typeof window.matchMedia | undefined }).matchMedia =
      origMatchMedia;
  });

  it('should initialize with current language and react to language changes', () => {
    const mockDoc = createMockDocument();
    const cmp = createComponent(router, translate, mockDoc);
    expect(cmp.currentLang).toBe('en');

    translate.use('de');
    expect(cmp.currentLang).toBe('de');
  });

  it('setLang persists to localStorage and cookie and reflects in URL via router.navigate', () => {
    const mockDoc = createMockDocument();
    const cmp = createComponent(router, translate, mockDoc);

    cmp.setLang('de');
    expect(translate.use).toHaveBeenCalledWith('de');
    expect(globalThis.localStorage.getItem('lang')).toBe('de');
    expect(mockDoc.cookie).toContain('lang=de');

    expect(router.navigate.mock.calls.length).toBe(1);
    const [commands, options] = router.navigate.mock.calls[0] || [];
    expect(commands).toEqual([]);
    expect(options).toMatchObject({
      queryParams: { lang: 'de' },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  });

  it('setLang switches from German to English', () => {
    const mockDoc = createMockDocument();
    const cmp = createComponent(router, translate, mockDoc);

    // Switch to German first
    cmp.setLang('de');
    expect(translate.use).toHaveBeenCalledWith('de');
    expect(globalThis.localStorage.getItem('lang')).toBe('de');

    // Switch back to English
    cmp.setLang('en');
    expect(translate.use).toHaveBeenCalledWith('en');
    expect(globalThis.localStorage.getItem('lang')).toBe('en');
    expect(mockDoc.cookie).toContain('lang=en');
  });

  it('currentLang updates when language changes via onLangChange subscription', () => {
    const mockDoc = createMockDocument();
    const cmp = createComponent(router, translate, mockDoc);

    expect(cmp.currentLang).toBe('en');

    // Simulate language change from external source
    translate.emitLangChange('de');
    expect(cmp.currentLang).toBe('de');

    translate.emitLangChange('en');
    expect(cmp.currentLang).toBe('en');
  });

  it('setLang persists language choice across multiple switches', () => {
    const mockDoc = createMockDocument();
    const cmp = createComponent(router, translate, mockDoc);

    // Multiple language switches
    cmp.setLang('de');
    expect(globalThis.localStorage.getItem('lang')).toBe('de');

    cmp.setLang('en');
    expect(globalThis.localStorage.getItem('lang')).toBe('en');

    cmp.setLang('de');
    expect(globalThis.localStorage.getItem('lang')).toBe('de');

    // Verify final state
    expect(translate.currentLang).toBe('de');
    expect(mockDoc.cookie).toContain('lang=de');
  });

  it('toggleHighContrast toggles body attribute and persists preference', () => {
    const mockDoc = createMockDocument();
    const cmp = createComponent(router, translate, mockDoc);

    // Initially off
    expect(mockDoc.body.getAttribute('data-theme')).toBeNull();

    // Toggle on
    cmp.toggleHighContrast();
    expect(mockDoc.body.getAttribute('data-theme')).toBe('hc');
    expect(globalThis.localStorage.getItem('pref:high-contrast')).toBe('on');
    expect(mockDoc.cookie).toContain('pref:high-contrast=on');

    // Toggle off
    cmp.toggleHighContrast();
    expect(mockDoc.body.getAttribute('data-theme')).toBeNull();
    expect(globalThis.localStorage.getItem('pref:high-contrast')).toBe('off');
    expect(mockDoc.cookie).toContain('pref:high-contrast=off');
  });

  it('initializes high-contrast from cookie when present', () => {
    const mockDoc = createMockDocument('pref:high-contrast=on');
    const cmp = createComponent(router, translate, mockDoc) as HeaderComponentWithState;
    expect(mockDoc.body.getAttribute('data-theme')).toBe('hc');
    expect(cmp.highContrast).toBe(true);
  });

  it('reacts to OS prefers-contrast changes when no explicit preference is saved', () => {
    // Clear any existing localStorage values to ensure clean test state
    globalThis.localStorage.removeItem('pref:high-contrast');

    // Provide a matchMedia stub with change listener capture
    let changeCb: ((e: MediaQueryListEvent) => void) | undefined;
    const mediaQueryList: MockMediaQueryList = {
      matches: true,
      addEventListener: jest.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
        changeCb = cb;
      }),
    };
    mutableWindow.matchMedia = jest
      .fn()
      .mockImplementation((_query: string) => mediaQueryList) as typeof window.matchMedia;

    const mockDoc = createMockDocument();
    const cmp = createComponent(router, translate, mockDoc) as HeaderComponentWithState;

    // Starts with matches=true
    expect(mockDoc.body.getAttribute('data-theme')).toBe('hc');
    expect(cmp.highContrast).toBe(true);

    // Simulate OS change to false; since no explicit prefs saved, component should update
    if (changeCb) {
      changeCb({ matches: false } as MediaQueryListEvent);
    }
    expect(cmp.highContrast).toBe(false);
    expect(mockDoc.body.getAttribute('data-theme')).toBeNull();
  });
});
