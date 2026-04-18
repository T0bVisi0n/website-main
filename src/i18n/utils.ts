export type Locale = 'de' | 'en';

export const DEFAULT_LOCALE: Locale = 'de';
export const LOCALES: Locale[] = ['de', 'en'];

export const LOCALE_LABELS: Record<Locale, string> = {
  de: 'DE',
  en: 'EN',
};

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  de: 'de-DE',
  en: 'en',
};

export function localizedPath(locale: Locale, path: string = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const trimmed = clean === '/' ? '' : clean.replace(/\/$/, '');
  return `/${locale}${trimmed}/`;
}

export function alternatePath(currentLocale: Locale, currentPath: string, targetLocale: Locale): string {
  const stripped = currentPath.replace(new RegExp(`^/${currentLocale}`), '');
  const normalized = stripped === '' || stripped === '/' ? '/' : stripped;
  return localizedPath(targetLocale, normalized);
}
