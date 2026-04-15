export const en = {
  site: {
    name: 'tomatenstau.de',
    title: 'tomatenstau.de – Meik Geldmacher',
    description:
      'Personal website of Meik Geldmacher – Software & Solution Architect, Team Lead Manager.',
  },
  header: {
    homeLinkLabel: 'Go to homepage',
    mainNavLabel: 'Main navigation',
    langSwitcherLabel: 'Language switcher',
    switchToEn: 'Switch to English',
    switchToDe: 'Switch to German',
    opensInNewWindow: 'opens in new window',
    highContrast: 'High contrast mode',
    toggleHighContrast: 'Toggle high contrast mode',
  },
  a11y: {
    skipToMain: 'Skip to main content',
  },
  index: {
    profilePhotoAlt: 'Profile photo of Meik Geldmacher',
    highlightsHeading: 'Professional highlights and skills',
    name: 'Meik Geldmacher',
    jobTitle: 'Software & Solution Architect · Team Lead Manager',
    intro:
      'I work as a Team Lead Manager as well as a Software and Solution Architect. My focus is on designing and evolving scalable system and software architectures, defining target pictures and roadmaps, technical leadership and coaching of teams, including leading an AI team, as well as stakeholder management across product, business, and IT. Additionally, I am responsible for architecture reviews, security and quality gates, integration and interface strategies (APIs, messaging/IoT), and establishing efficient delivery processes (CI/CD, observability).',
    highlights: {
      focus: 'Focus areas:',
      focusText:
        'Software & solution architecture, project leadership, roadmaps & stakeholder management',
      tech: 'Tech:',
      techText: 'Angular, TypeScript/JavaScript, Node.js, Python, Java (Spring Boot 2.x/3.x), Perl',
      platforms: 'Platforms & data:',
      platformsText: 'RESTful APIs, MQTT/IoT, CI/CD, MySQL, MongoDB, Redis',
      domains: 'Domains:',
      domainsText: 'Industry/IoT, manufacturing, enterprise applications, e-commerce/SEO',
      certs: 'Certifications:',
      certsText: 'iSAQB CPSA-A (06/2023), modules DDD, CLOUDINFRA, ARCEVAL; CPSA-F (12/2016)',
    },
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} tomatenstau.de`,
    emailLabel: 'E-Mail',
  },
  social: {
    github: { label: 'GitHub', url: 'https://github.com/Paulchenkiller' },
    linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/meik-geldmacher' },
    xing: { label: 'XING', url: 'https://www.xing.com/profile/Meik_Geldmacher' },
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
