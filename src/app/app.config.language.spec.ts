import {
  readBrowserCookie,
  resolvePreferredLanguage,
  writeBrowserCookie,
  writeBrowserStorage,
} from './preferences/browser-preferences';

interface MockCookieDocument {
  cookie: string;
}

describe('browser-preferences', () => {
  let mockLocalStorage: Record<string, string>;
  let mockDocument: MockCookieDocument;
  let storage: Storage;

  beforeEach(() => {
    mockLocalStorage = {};
    storage = {
      getItem: (key: string) => mockLocalStorage[key] || null,
      setItem: (key: string, value: string) => {
        mockLocalStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockLocalStorage[key];
      },
      clear: () => {
        mockLocalStorage = {};
      },
      key: (_index: number) => null,
      length: 0,
    } as Storage;

    mockDocument = { cookie: '' };
  });

  function resolveLanguage(search: string, navigatorLanguages = ['en-US']): string {
    return resolvePreferredLanguage({
      doc: mockDocument as Document,
      fallback: 'en',
      navigatorLanguage: navigatorLanguages[0],
      navigatorLanguages,
      search,
      storage,
      supported: ['en', 'de'],
    }).resolvedLang;
  }

  it('reads and writes cookies safely', () => {
    writeBrowserCookie(mockDocument as Document, 'lang', 'de', 365);

    expect(mockDocument.cookie).toContain('lang=de');
    expect(readBrowserCookie(mockDocument as Document, 'lang')).toBe('de');
  });

  it('writes storage safely', () => {
    writeBrowserStorage(storage, 'lang', 'de');

    expect(mockLocalStorage['lang']).toBe('de');
  });

  describe('language resolution', () => {
    it('uses language from the URL parameter', () => {
      expect(resolveLanguage('/?lang=de'.replace('/', ''))).toBe('de');
      expect(resolveLanguage('/?lang=en'.replace('/', ''))).toBe('en');
    });

    it('ignores invalid URL language parameters', () => {
      expect(resolveLanguage('/?lang=fr'.replace('/', ''))).toBe('en');
    });

    it('uses language from cookie when URL parameter is not set', () => {
      mockDocument.cookie = 'lang=de; path=/';

      expect(resolveLanguage('')).toBe('de');
    });

    it('uses language from localStorage when URL and cookie are not set', () => {
      mockLocalStorage['lang'] = 'de';

      expect(resolveLanguage('')).toBe('de');
    });

    it('uses browser language when no other preference is set', () => {
      mockDocument.cookie = '';

      expect(resolveLanguage('', ['de-DE', 'de'])).toBe('de');
    });

    it('defaults to English when browser language is not supported', () => {
      expect(resolveLanguage('', ['fr-FR', 'fr'])).toBe('en');
    });

    it('prioritizes URL parameter over cookie and localStorage', () => {
      mockLocalStorage['lang'] = 'de';
      mockDocument.cookie = 'lang=de; path=/';

      expect(resolveLanguage('?lang=en')).toBe('en');
    });

    it('prioritizes cookie over localStorage', () => {
      mockLocalStorage['lang'] = 'en';
      mockDocument.cookie = 'lang=de; path=/';

      expect(resolveLanguage('')).toBe('de');
    });
  });
});
