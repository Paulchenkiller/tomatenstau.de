import { AppRouteMeta } from './route-meta';

export function buildRouteMeta(
  titleKey: string,
  descriptionKey: string,
  schemaType: AppRouteMeta['schemaType'] = 'article',
): { meta: AppRouteMeta } {
  return {
    meta: {
      titleKey,
      descriptionKey,
      breadcrumbKey: titleKey,
      schemaType,
    },
  };
}
