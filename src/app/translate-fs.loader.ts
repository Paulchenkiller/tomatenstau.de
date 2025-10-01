import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { makeStateKey, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

/**
 * TranslateLoader that works with Server-Side Rendering
 * Pre-loads translations on the server and transfers them to the client
 * Falls back to HTTP requests when TransferState data is not available
 */
export class TranslateFsLoader implements TranslateLoader {
  private http = inject(HttpClient);

  constructor(
    private transferState: TransferState,
    private prefix: string = './assets/i18n/',
    private suffix: string = '.json',
  ) {}

  public getTranslation(lang: string): Observable<any> {
    const key = makeStateKey<any>(`transfer-translate-${lang}`);
    const data = this.transferState.get(key, null);

    // If we have data in transfer state (from server), use it
    if (data) {
      return of(data);
    }

    // Fallback to HTTP request for client-side navigation
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}
