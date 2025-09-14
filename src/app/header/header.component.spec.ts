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
  getDefaultLang() { return 'en'; }
}

class FaIconLibraryStub {
  addIconPacks() {/* noop */}
}

describe('HeaderComponent', () => {
  let router: Partial<Router> & { events: Subject<any> };
  let translate: TranslateStub;
  let lib: FaIconLibraryStub;
  let origLocalStorage: Storage | undefined;

  beforeEach(() => {
    router = { events: new Subject() } as any;
    translate = new TranslateStub();
    lib = new FaIconLibraryStub();

    // Mock localStorage
    origLocalStorage = (globalThis as any).localStorage as any;
    const store: Record<string, string> = {};
    const mockLocalStorage = {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => { store[k] = v; },
      removeItem: (k: string) => { delete store[k]; },
      clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
      key: (i: number) => Object.keys(store)[i] ?? null,
      length: 0,
    } as unknown as Storage;
    Object.defineProperty(globalThis, 'localStorage', { value: mockLocalStorage, configurable: true });
  });

  afterEach(() => {
    // Restore localStorage
    if (origLocalStorage) {
      Object.defineProperty(globalThis, 'localStorage', { value: origLocalStorage, configurable: true });
    }
  });

  it('should initialize with current language and react to language changes', () => {
    const cmp = new HeaderComponent(router as any, lib as any, translate as any);
    expect(cmp.currentLang).toBe('en');

    translate.use('de');
    expect(cmp.currentLang).toBe('de');
  });

  it('setLang should call translate.use and persist to localStorage', () => {
    const cmp = new HeaderComponent(router as any, lib as any, translate as any);

    cmp.setLang('de');
    expect(translate.use).toHaveBeenCalledWith('de');
    expect((globalThis as any).localStorage.getItem('lang')).toBe('de');
  });
});
