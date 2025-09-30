import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { makeStateKey, TransferState } from '@angular/core';

/**
 * TranslateLoader that works with Server-Side Rendering
 * Pre-loads translations on the server and transfers them to the client
 */
export class TranslateFsLoader implements TranslateLoader {
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

    // This should not happen in production SSR, but fallback to empty object
    // The actual loading happens in the server config
    return of({});
  }
}
