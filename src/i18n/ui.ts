export const languages = {
  en: "English",
  de: "Deutsch",
};

export const defaultLang = "en";

export const ui = {
  en: {
    SITE: {
      NAME: "tomatenstau.de - Programming Tutorials",
    },
    HEADER: {
      LANG: {
        EN: "English",
        DE: "German",
      },
      ARIA: {
        LANG_SWITCHER: "Language switcher",
        SWITCH_EN: "Switch to English",
        SWITCH_DE: "Switch to German",
        HOME_LINK: "Go to homepage",
        MAIN_NAVIGATION: "Main navigation",
        OPENS_NEW_WINDOW: "opens in new window",
      },
    },
    A11Y: {
      SKIP_TO_MAIN: "Skip to main content",
      SKIP_TO_NAV: "Skip to navigation",
      HIGH_CONTRAST: "High contrast mode",
      TOGGLE_HIGH_CONTRAST: "Toggle high contrast mode",
    },
    INDEX: {
      ARIA: {
        PROFILE_PHOTO: "Profile photo of Meik Geldmacher",
        HIGHLIGHTS_HEADING: "Professional highlights and skills",
      },
      NAME: "Meik Geldmacher",
      TITLE: "Software & Solution Architect · Team Lead Manager",
      INTRO:
        "I work as a Team Lead Manager as well as a Software and Solution Architect. My focus is on designing and evolving scalable system and software architectures, defining target pictures and roadmaps, technical leadership and coaching of teams, including leading an AI team, as well as stakeholder management across product, business, and IT. Additionally, I am responsible for architecture reviews, security and quality gates, integration and interface strategies (APIs, messaging/IoT), and establishing efficient delivery processes (CI/CD, observability).",
      HIGHLIGHTS: {
        FOCUS: "Focus areas:",
        FOCUS_TEXT:
          "Software & solution architecture, project leadership, roadmaps & stakeholder management",
        TECH: "Tech:",
        TECH_TEXT:
          "Angular, TypeScript/JavaScript, Node.js, Python, Java (Spring Boot 2.x/3.x), Perl",
        PLATFORMS: "Platforms & data:",
        PLATFORMS_TEXT: "RESTful APIs, MQTT/IoT, CI/CD, MySQL, MongoDB, Redis",
        DOMAINS: "Domains:",
        DOMAINS_TEXT:
          "Industry/IoT, manufacturing, enterprise applications, e-commerce/SEO",
        CERTS: "Certifications:",
        CERTS_TEXT:
          "iSAQB CPSA-A (06/2023), modules DDD, CLOUDINFRA, ARCEVAL; CPSA-F (12/2016)",
      },
    },
    "404": {
      TITLE: "Page not found",
      SUBTITLE: "The page you requested could not be found.",
      CTA_HOME: "Back to home",
    },
  },
  de: {
    SITE: {
      NAME: "tomatenstau.de - Programmier-Tutorials",
    },
    HEADER: {
      LANG: {
        EN: "Englisch",
        DE: "Deutsch",
      },
      ARIA: {
        LANG_SWITCHER: "Sprachauswahl",
        SWITCH_EN: "Auf Englisch umschalten",
        SWITCH_DE: "Auf Deutsch umschalten",
        HOME_LINK: "Zur Startseite",
        MAIN_NAVIGATION: "Hauptnavigation",
        OPENS_NEW_WINDOW: "öffnet in neuem Fenster",
      },
    },
    A11Y: {
      SKIP_TO_MAIN: "Zum Hauptinhalt springen",
      SKIP_TO_NAV: "Zur Navigation springen",
      HIGH_CONTRAST: "Hoher Kontrast",
      TOGGLE_HIGH_CONTRAST: "Hohen Kontrast umschalten",
    },
    INDEX: {
      ARIA: {
        PROFILE_PHOTO: "Profilbild von Meik Geldmacher",
        HIGHLIGHTS_HEADING: "Berufliche Highlights und Fähigkeiten",
      },
      NAME: "Meik Geldmacher",
      TITLE: "Software‑ & Solution‑Architekt · Team Lead Manager",
      INTRO:
        "Ich bin in den Rollen Team Lead Manager sowie Software- und Solution-Architekt tätig. Mein Fokus liegt auf der Konzeption und Weiterentwicklung skalierbarer System- und Softwarearchitekturen, der Ausarbeitung von Zielbildern und Roadmaps, technischer Leitung und Coaching von Teams, einschließlich der Leitung eines KI-Teams, sowie dem Stakeholder-Management über Produkt-, Fach- und IT-Bereiche hinweg. Darüber hinaus verantworte ich Architektur-Reviews, Security- und Quality-Gates, Integrations- und Schnittstellenstrategien (APIs, Messaging/IoT) sowie die Umsetzung effizienter Delivery-Prozesse (CI/CD, Observability).",
      HIGHLIGHTS: {
        FOCUS: "Schwerpunkte:",
        FOCUS_TEXT:
          "Software- & Solution-Architektur, Projektleitung, Roadmaps & Stakeholder-Management",
        TECH: "Tech:",
        TECH_TEXT:
          "Angular, TypeScript/JavaScript, Node.js, Python, Java (Spring Boot 2.x/3.x), Perl",
        PLATFORMS: "Plattformen & Daten:",
        PLATFORMS_TEXT: "RESTful APIs, MQTT/IoT, CI/CD, MySQL, MongoDB, Redis",
        DOMAINS: "Domänen:",
        DOMAINS_TEXT:
          "Industrie/IoT, Manufacturing, Enterprise-Anwendungen, E-Commerce/SEO",
        CERTS: "Zertifizierungen:",
        CERTS_TEXT:
          "iSAQB CPSA-A (06/2023), Module DDD, CLOUDINFRA, ARCEVAL; CPSA-F (12/2016)",
      },
    },
    "404": {
      TITLE: "Seite nicht gefunden",
      SUBTITLE: "Die angeforderte Seite konnte nicht gefunden werden.",
      CTA_HOME: "Zur Startseite",
    },
  },
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split(".");
    let current: any = ui[lang];
    for (const k of keys) {
      if (current === undefined) return key;
      current = current[k];
    }
    return current || key;
  };
}
