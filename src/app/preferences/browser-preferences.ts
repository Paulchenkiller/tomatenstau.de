export type PreferenceLogger = (action: string, key: string, error: unknown) => void;

interface ResolvePreferredLanguageOptions {
  doc?: Document;
  fallback: string;
  logError?: PreferenceLogger;
  navigatorLanguage?: string;
  navigatorLanguages?: readonly string[];
  search: string;
  storage?: Storage;
  supported: readonly string[];
}

interface ResolvedPreferredLanguage {
  browserLang: string;
  cookieLang: string | null;
  resolvedLang: string;
  savedLang: string | null;
  urlLang: string | null;
}

function normalizeSupportedLanguage(
  language: string | null | undefined,
  supported: readonly string[],
): string | null {
  const normalizedLanguage = language?.toLowerCase();
  return normalizedLanguage && supported.includes(normalizedLanguage) ? normalizedLanguage : null;
}

function resolveBrowserLanguage(
  navigatorLanguage: string | undefined,
  navigatorLanguages: readonly string[] | undefined,
  supported: readonly string[],
  fallback: string,
): string {
  const browserLanguages = navigatorLanguages?.length ? navigatorLanguages : [navigatorLanguage];

  for (const language of browserLanguages) {
    const baseLanguage = language?.toLowerCase().split('-')[0];
    if (baseLanguage && supported.includes(baseLanguage)) {
      return baseLanguage;
    }
  }

  return fallback;
}

export function readBrowserCookie(
  doc: Document | undefined,
  name: string,
  logError?: PreferenceLogger,
): string | null {
  if (!doc) {
    return null;
  }

  const namePrefix = `${name}=`;
  try {
    const parts = (doc.cookie || '').split(';');
    for (let cookie of parts) {
      cookie = cookie.trim();
      if (cookie.startsWith(namePrefix)) {
        return decodeURIComponent(cookie.substring(namePrefix.length));
      }
    }
  } catch (error) {
    logError?.('read cookie', name, error);
  }

  return null;
}

export function writeBrowserCookie(
  doc: Document | undefined,
  name: string,
  value: string,
  days: number,
  logError?: PreferenceLogger,
): void {
  if (!doc) {
    return;
  }

  try {
    const maxAge = days > 0 ? `; max-age=${days * 24 * 60 * 60}` : '';
    doc.cookie = `${name}=${encodeURIComponent(value)}; path=/${maxAge}`;
  } catch (error) {
    logError?.('write cookie', name, error);
  }
}

export function readBrowserStorage(
  storage: Storage | undefined,
  key: string,
  logError?: PreferenceLogger,
): string | null {
  if (!storage) {
    return null;
  }

  try {
    return storage.getItem(key);
  } catch (error) {
    logError?.('read localStorage', key, error);
    return null;
  }
}

export function writeBrowserStorage(
  storage: Storage | undefined,
  key: string,
  value: string,
  logError?: PreferenceLogger,
): void {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(key, value);
  } catch (error) {
    logError?.('write localStorage', key, error);
  }
}

export function resolvePreferredLanguage(
  options: ResolvePreferredLanguageOptions,
): ResolvedPreferredLanguage {
  const {
    doc,
    fallback,
    logError,
    navigatorLanguage,
    navigatorLanguages,
    search,
    storage,
    supported,
  } = options;
  const params = new URLSearchParams(search);
  const urlLang = normalizeSupportedLanguage(params.get('lang'), supported);
  const cookieSaved = (readBrowserCookie(doc, 'lang', logError) || '').toLowerCase();
  const cookieLang = normalizeSupportedLanguage(cookieSaved, supported);
  const savedLang = normalizeSupportedLanguage(
    readBrowserStorage(storage, 'lang', logError),
    supported,
  );
  const browserLang = resolveBrowserLanguage(
    navigatorLanguage,
    navigatorLanguages,
    supported,
    fallback,
  );

  return {
    browserLang,
    cookieLang,
    resolvedLang: urlLang || cookieLang || savedLang || browserLang || fallback,
    savedLang,
    urlLang,
  };
}
