import type { Translations } from './en';

export const de: Translations = {
  site: {
    name: 'tomatenstau.de',
    title: 'tomatenstau.de – Meik Geldmacher',
    description:
      'Persönliche Website von Meik Geldmacher – Software- & Solution-Architekt, Team Lead Manager.',
  },
  header: {
    homeLinkLabel: 'Zur Startseite',
    mainNavLabel: 'Hauptnavigation',
    langSwitcherLabel: 'Sprachauswahl',
    switchToEn: 'Auf Englisch umschalten',
    switchToDe: 'Auf Deutsch umschalten',
    opensInNewWindow: 'öffnet in neuem Fenster',
    highContrast: 'Hoher Kontrast',
    toggleHighContrast: 'Kontrastmodus umschalten',
  },
  a11y: {
    skipToMain: 'Zum Hauptinhalt springen',
  },
  index: {
    profilePhotoAlt: 'Profilbild von Meik Geldmacher',
    highlightsHeading: 'Berufliche Highlights und Fähigkeiten',
    name: 'Meik Geldmacher',
    jobTitle: 'Software‑ & Solution‑Architekt · Team Lead Manager',
    intro:
      'Ich bin in den Rollen Team Lead Manager sowie Software- und Solution-Architekt tätig. Mein Fokus liegt auf der Konzeption und Weiterentwicklung skalierbarer System- und Softwarearchitekturen, der Ausarbeitung von Zielbildern und Roadmaps, technischer Leitung und Coaching von Teams, einschließlich der Leitung eines KI-Teams, sowie dem Stakeholder-Management über Produkt-, Fach- und IT-Bereiche hinweg. Darüber hinaus verantworte ich Architektur-Reviews, Security- und Quality-Gates, Integrations- und Schnittstellenstrategien (APIs, Messaging/IoT) sowie die Umsetzung effizienter Delivery-Prozesse (CI/CD, Observability).',
    highlights: {
      focus: 'Schwerpunkte:',
      focusText:
        'Software- & Solution-Architektur, Projektleitung, Roadmaps & Stakeholder-Management',
      tech: 'Tech:',
      techText: 'Angular, TypeScript/JavaScript, Node.js, Python, Java (Spring Boot 2.x/3.x), Perl',
      platforms: 'Plattformen & Daten:',
      platformsText: 'RESTful APIs, MQTT/IoT, CI/CD, MySQL, MongoDB, Redis',
      domains: 'Domänen:',
      domainsText: 'Industrie/IoT, Manufacturing, Enterprise-Anwendungen, E-Commerce/SEO',
      certs: 'Zertifizierungen:',
      certsText: 'iSAQB CPSA-A (06/2023), Module DDD, CLOUDINFRA, ARCEVAL; CPSA-F (12/2016)',
    },
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} tomatenstau.de`,
  },
  social: {
    github: { label: 'GitHub', url: 'https://github.com/Paulchenkiller' },
    linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/meik-geldmacher' },
    xing: { label: 'XING', url: 'https://www.xing.com/profile/Meik_Geldmacher' },
    email: { label: 'E-Mail', url: 'mailto:meik@tomatenstau.de' },
  },
  notFound: {
    title: 'Seite nicht gefunden',
    subtitle: 'Die angeforderte Seite konnte nicht gefunden werden.',
    backHome: 'Zur Startseite',
  },
};
