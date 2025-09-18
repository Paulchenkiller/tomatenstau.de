import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

class TranslateStub {
  public currentLang = 'en';
  public onLangChange = new Subject<{ lang: string }>();
  use = jest.fn((lang: string) => {
    this.currentLang = lang;
    this.onLangChange.next({ lang });
  });
  getDefaultLang() {
    return 'en';
  }
}

class FaIconLibraryStub {
  addIconPacks() {
    /* noop */
  }
}

function createMockDocument(initCookie = ''): Document {
  const attrs: Record<string, string> = {};
  const body = {
    setAttribute: (n: string, v: string) => {
      attrs[n] = v;
    },
    removeAttribute: (n: string) => {
      delete attrs[n];
    },
    getAttribute: (n: string) => attrs[n] ?? null,
  } as any;
  const doc = {
    body,
    cookie: initCookie,
  } as any as Document;
  return doc;
}

describe('HeaderComponent', () => {
  let router: Partial<Router> & { events: Subject<any>; navigate?: jest.Mock };
  let translate: TranslateStub;
  let lib: FaIconLibraryStub;
  let origLocalStorage: Storage | undefined;
  let origMatchMedia: any;

  beforeEach(() => {
    router = { events: new Subject(), navigate: jest.fn() } as any;
    translate = new TranslateStub();
    lib = new FaIconLibraryStub();

    // Mock localStorage
    origLocalStorage = (globalThis as any).localStorage as any;
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
    origMatchMedia = (window as any).matchMedia;
    (window as any).matchMedia = undefined;
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
    (window as any).matchMedia = origMatchMedia;
  });

  it('should initialize with current language, react to language changes, and close menu on router events', () => {
    const mockDoc = createMockDocument();
    const cmp = new HeaderComponent(router as any, lib as any, translate as any, mockDoc);
    expect(cmp.currentLang).toBe('en');

    translate.use('de');
    expect(cmp.currentLang).toBe('de');

    // Router events should close the menu
    (cmp as any).menu = true;
    router.events.next({ type: 'NAV' });
    expect((cmp as any).menu).toBe(false);
  });

  it('setLang persists to localStorage and cookie and reflects in URL via router.navigate', () => {
    const mockDoc = createMockDocument();
    const cmp = new HeaderComponent(router as any, lib as any, translate as any, mockDoc);

    cmp.setLang('de');
    expect(translate.use).toHaveBeenCalledWith('de');
    expect((globalThis as any).localStorage.getItem('lang')).toBe('de');
    expect((mockDoc as any).cookie).toContain('lang=de');

    expect((router.navigate as jest.Mock).mock.calls.length).toBe(1);
    expect((router.navigate as jest.Mock).mock.calls[0][0]).toEqual([]);
    expect((router.navigate as jest.Mock).mock.calls[0][1]).toMatchObject({
      queryParams: { lang: 'de' },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  });

  it('toggleHighContrast toggles body attribute and persists preference', () => {
    const mockDoc = createMockDocument();
    const cmp = new HeaderComponent(router as any, lib as any, translate as any, mockDoc);

    // Initially off
    expect((mockDoc.body as any).getAttribute('data-theme')).toBeNull();

    // Toggle on
    cmp.toggleHighContrast();
    expect((mockDoc.body as any).getAttribute('data-theme')).toBe('hc');
    expect((globalThis as any).localStorage.getItem('pref:high-contrast')).toBe('on');
    expect((mockDoc as any).cookie).toContain('pref:high-contrast=on');

    // Toggle off
    cmp.toggleHighContrast();
    expect((mockDoc.body as any).getAttribute('data-theme')).toBeNull();
    expect((globalThis as any).localStorage.getItem('pref:high-contrast')).toBe('off');
    expect((mockDoc as any).cookie).toContain('pref:high-contrast=off');
  });

  it('initializes high-contrast from cookie when present', () => {
    const mockDoc = createMockDocument('pref:high-contrast=on');
    const cmp = new HeaderComponent(router as any, lib as any, translate as any, mockDoc);
    expect((mockDoc.body as any).getAttribute('data-theme')).toBe('hc');
    expect((cmp as any).highContrast).toBe(true);
  });

  it('reacts to OS prefers-contrast changes when no explicit preference is saved', () => {
    // Clear any existing localStorage values to ensure clean test state
    (globalThis as any).localStorage.removeItem('pref:high-contrast');

    // Provide a matchMedia stub with change listener capture
    let changeCb: ((e: any) => void) | undefined;
    (window as any).matchMedia = jest.fn().mockImplementation((_q: string) => ({
      matches: true,
      addEventListener: jest.fn((_: string, cb: (e: any) => void) => {
        changeCb = cb;
      }),
    }));

    const mockDoc = createMockDocument();
    const cmp = new HeaderComponent(router as any, lib as any, translate as any, mockDoc);

    // Starts with matches=true
    expect((mockDoc.body as any).getAttribute('data-theme')).toBe('hc');
    expect((cmp as any).highContrast).toBe(true);

    // Simulate OS change to false; since no explicit prefs saved, component should update
    changeCb && changeCb({ matches: false });
    expect((cmp as any).highContrast).toBe(false);
    expect((mockDoc.body as any).getAttribute('data-theme')).toBeNull();
  });
});
