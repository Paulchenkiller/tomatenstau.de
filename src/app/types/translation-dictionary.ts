export type TranslationValue =
  | string
  | TranslationDictionary
  | TranslationValue[]
  | null
  | undefined;

export interface TranslationDictionary {
  [key: string]: TranslationValue;
}
