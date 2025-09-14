import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

class FakeLoader implements TranslateLoader {
  getTranslation(_lang: string) {
    return of({});
  }
}

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: FakeLoader },
        defaultLanguage: 'en',
      }),
    ],
  });
});
