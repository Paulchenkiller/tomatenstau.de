export const en = {
  site: {
    name: 'tomatenstau.de',
    title: 'tomatenstau.de – Meik Geldmacher | Software & Solution Architect',
    description:
      'Personal website of Meik Geldmacher – Software & Solution Architect and Team Lead Manager specialising in scalable architectures, technical leadership, and IoT/enterprise software.',
  },
  a11y: {
    skipToMain: 'Skip to main content',
  },
  index: {
    profilePhotoAlt: 'Profile photo of Meik Geldmacher',
  },
  social: {
    github: { label: 'GitHub', url: 'https://github.com/Paulchenkiller' },
    linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/meik-geldmacher' },
    email: { label: 'E-Mail', url: 'mailto:meik@tomatenstau.de' },
  },
  notFound: {
    title: 'Page not found',
    subtitle: 'The page you requested could not be found.',
    backHome: 'Back to home',
  },
} as const;

/** Recursively widens all string literals to `string` so translations can satisfy this type. */
type Widened<T> = T extends string ? string : { [K in keyof T]: Widened<T[K]> };

export type Translations = Widened<typeof en>;
