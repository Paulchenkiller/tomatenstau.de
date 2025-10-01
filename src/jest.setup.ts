import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

class FakeLoader implements TranslateLoader {
  getTranslation(_lang: string) {
    return of({});
  }
}

// Mock highlight.js to prevent console warnings and improve test performance
const mockHighlightService = {
  highlight: jest.fn().mockReturnValue({ value: 'mocked code' }),
  highlightAuto: jest.fn().mockReturnValue({ value: 'mocked code', language: 'javascript' }),
  getLanguage: jest.fn().mockReturnValue({ name: 'JavaScript' }),
  listLanguages: jest.fn().mockReturnValue(['javascript', 'typescript', 'html']),
  registerLanguage: jest.fn(),
  configure: jest.fn(),
};

// Mock ngx-highlightjs
jest.mock('ngx-highlightjs', () => ({
  HighlightModule: {
    forRoot: jest.fn().mockReturnValue({
      ngModule: class MockHighlightModule {
        static ɵmod: any = { id: 'MockHighlightModule' };
      },
      providers: [],
    }),
  },
  HighlightJS: jest.fn().mockImplementation(() => mockHighlightService),
  HIGHLIGHT_OPTIONS: 'HIGHLIGHT_OPTIONS',
  Highlight: class MockHighlight {
    static ɵmod: any = { id: 'MockHighlight' };
  },
}));

// Mock highlight.js core library
jest.mock('highlight.js', () => mockHighlightService);

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: FakeLoader },
        fallbackLang: 'en',
      }),
    ],
  });
});
