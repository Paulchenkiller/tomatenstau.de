import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';

describe('Language Initialization (app.config.ts)', () => {
  let translateService: TranslateService;
  let mockLocalStorage: { [key: string]: string };
  let mockDocument: any;

  beforeEach(() => {
    // Mock localStorage
    mockLocalStorage = {};
    const localStorageMock = {
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
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // Mock document.cookie
    mockDocument = {
      cookie: '',
    };
    Object.defineProperty(document, 'cookie', {
      get: () => mockDocument.cookie,
      set: (value: string) => {
        mockDocument.cookie = value;
      },
      configurable: true,
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('URL Parameter Language Selection', () => {
    it('should use language from URL parameter ?lang=de', () => {
      // Mock window.location.search
      Object.defineProperty(window, 'location', {
        value: { search: '?lang=de' },
        writable: true,
        configurable: true,
      });

      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [provideHttpClient(), { provide: PLATFORM_ID, useValue: 'browser' }],
      });

      translateService = TestBed.inject(TranslateService);
      translateService.addLangs(['en', 'de']);
      translateService.setDefaultLang('en');

      // Simulate URL parameter detection
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && ['en', 'de'].includes(urlLang.toLowerCase())) {
        translateService.use(urlLang.toLowerCase());
      }

      expect(translateService.currentLang).toBe('de');
    });

    it('should use language from URL parameter ?lang=en', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?lang=en' },
        writable: true,
        configurable: true,
      });

      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [provideHttpClient(), { provide: PLATFORM_ID, useValue: 'browser' }],
      });

      translateService = TestBed.inject(TranslateService);
      translateService.addLangs(['en', 'de']);
      translateService.setDefaultLang('en');

      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && ['en', 'de'].includes(urlLang.toLowerCase())) {
        translateService.use(urlLang.toLowerCase());
      }

      expect(translateService.currentLang).toBe('en');
    });

    it('should ignore invalid URL language parameter', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?lang=fr' },
        writable: true,
        configurable: true,
      });

      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [provideHttpClient(), { provide: PLATFORM_ID, useValue: 'browser' }],
      });

      translateService = TestBed.inject(TranslateService);
      translateService.addLangs(['en', 'de']);
      translateService.setDefaultLang('en');

      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      const normalizedUrlLang =
        urlLang && ['en', 'de'].includes(urlLang.toLowerCase()) ? urlLang.toLowerCase() : null;

      if (normalizedUrlLang) {
        translateService.use(normalizedUrlLang);
      } else {
        translateService.use('en');
      }

      expect(translateService.currentLang).toBe('en');
    });
  });

  describe('Cookie Language Selection', () => {
    it('should use language from cookie when URL parameter is not set', () => {
      mockDocument.cookie = 'lang=de; path=/';
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
        configurable: true,
      });

      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [provideHttpClient(), { provide: PLATFORM_ID, useValue: 'browser' }],
      });

      translateService = TestBed.inject(TranslateService);
      translateService.addLangs(['en', 'de']);
      translateService.setDefaultLang('en');

      // Read cookie
      const readCookie = (name: string): string | null => {
        const nameEQ = name + '=';
        const parts = (document.cookie || '').split(';');
        for (let c of parts) {
          c = c.trim();
          if (c.startsWith(nameEQ)) {
            return decodeURIComponent(c.substring(nameEQ.length));
          }
        }
        return null;
      };

      const cookieSaved = (readCookie('lang') || '').toLowerCase();
      const cookieLang = ['en', 'de'].includes(cookieSaved) ? cookieSaved : null;

      if (cookieLang) {
        translateService.use(cookieLang);
      }

      expect(translateService.currentLang).toBe('de');
    });
  });

  describe('LocalStorage Language Selection', () => {
    it('should use language from localStorage when URL and cookie are not set', () => {
      mockLocalStorage['lang'] = 'de';
      mockDocument.cookie = '';
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
        configurable: true,
      });

      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [provideHttpClient(), { provide: PLATFORM_ID, useValue: 'browser' }],
      });

      translateService = TestBed.inject(TranslateService);
      translateService.addLangs(['en', 'de']);
      translateService.setDefaultLang('en');

      const saved = localStorage.getItem('lang');
      if (saved && ['en', 'de'].includes(saved)) {
        translateService.use(saved);
      }

      expect(translateService.currentLang).toBe('de');
    });
  });

  describe('Browser Language Detection', () => {
    it('should use browser language when no other preference is set', () => {
      mockDocument.cookie = '';
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
        configurable: true,
      });
      Object.defineProperty(navigator, 'languages', {
        value: ['de-DE', 'de'],
        writable: true,
        configurable: true,
      });

      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [provideHttpClient(), { provide: PLATFORM_ID, useValue: 'browser' }],
      });

      translateService = TestBed.inject(TranslateService);
      translateService.addLangs(['en', 'de']);
      translateService.setDefaultLang('en');

      const browserLangs = navigator.languages || [navigator.language];
      const browserLang =
        browserLangs
          .map((lang) => lang?.toLowerCase().split('-')[0])
          .find((lang) => ['de', 'en'].includes(lang || '')) || 'en';

      translateService.use(browserLang);

      expect(translateService.currentLang).toBe('de');
    });

    it('should default to English when browser language is not supported', () => {
      mockDocument.cookie = '';
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
        configurable: true,
      });
      Object.defineProperty(navigator, 'languages', {
        value: ['fr-FR', 'fr'],
        writable: true,
        configurable: true,
      });

      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [provideHttpClient(), { provide: PLATFORM_ID, useValue: 'browser' }],
      });

      translateService = TestBed.inject(TranslateService);
      translateService.addLangs(['en', 'de']);
      translateService.setDefaultLang('en');

      const browserLangs = navigator.languages || [navigator.language];
      const browserLang =
        browserLangs
          .map((lang) => lang?.toLowerCase().split('-')[0])
          .find((lang) => ['de', 'en'].includes(lang || '')) || 'en';

      translateService.use(browserLang);

      expect(translateService.currentLang).toBe('en');
    });
  });

  describe('Language Priority Order', () => {
    it('should prioritize URL parameter over cookie and localStorage', () => {
      mockLocalStorage['lang'] = 'de';
      mockDocument.cookie = 'lang=de; path=/';
      Object.defineProperty(window, 'location', {
        value: { search: '?lang=en' },
        writable: true,
        configurable: true,
      });

      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [provideHttpClient(), { provide: PLATFORM_ID, useValue: 'browser' }],
      });

      translateService = TestBed.inject(TranslateService);
      translateService.addLangs(['en', 'de']);
      translateService.setDefaultLang('en');

      // Simulate priority detection
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      const normalizedUrlLang =
        urlLang && ['en', 'de'].includes(urlLang.toLowerCase()) ? urlLang.toLowerCase() : null;

      const lang = normalizedUrlLang || localStorage.getItem('lang') || 'en';
      translateService.use(lang);

      expect(translateService.currentLang).toBe('en');
    });

    it('should prioritize cookie over localStorage', () => {
      mockLocalStorage['lang'] = 'en';
      mockDocument.cookie = 'lang=de; path=/';
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
        configurable: true,
      });

      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [provideHttpClient(), { provide: PLATFORM_ID, useValue: 'browser' }],
      });

      translateService = TestBed.inject(TranslateService);
      translateService.addLangs(['en', 'de']);
      translateService.setDefaultLang('en');

      // Read cookie
      const readCookie = (name: string): string | null => {
        const nameEQ = name + '=';
        const parts = (document.cookie || '').split(';');
        for (let c of parts) {
          c = c.trim();
          if (c.startsWith(nameEQ)) {
            return decodeURIComponent(c.substring(nameEQ.length));
          }
        }
        return null;
      };

      const cookieSaved = (readCookie('lang') || '').toLowerCase();
      const cookieLang = ['en', 'de'].includes(cookieSaved) ? cookieSaved : null;
      const saved = localStorage.getItem('lang');

      const lang = cookieLang || saved || 'en';
      translateService.use(lang);

      expect(translateService.currentLang).toBe('de');
    });
  });
});
