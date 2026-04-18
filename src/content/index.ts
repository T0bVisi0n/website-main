import { de } from './de';
import { en } from './en';
import type { Locale } from '../i18n/utils';

export const content = { de, en };

export function getContent(locale: Locale) {
  return content[locale];
}
