# TODO / Backlog für tomatenstau.de

Sammlung sinnvoller Verbesserungen und offener Punkte für die Weiterentwicklung der Seite. Die Liste ist priorisierbar und soll als lebendes Dokument dienen.

- Inhalt & Struktur
  - [ ] Startseite: Teaser-Abschnitte mit „Mehr erfahren“-Links strukturieren (Hero → Highlights → ausgewählte Code-Themen).
  - [x] Code-Bereiche: Einleitungstexte vereinheitlichen, Beispiele mit kurzen Erklärungen einleiten und Querverweise zwischen Sprachen ergänzen.
  - [x] Breadcrumb/Navigation: Einheitliche Schreibweise und ggf. neutrales Key-Schema für Navigationslabels (z. B. NAV.\*) vorbereiten, ohne bestehende Routen zu brechen.
  - [x] 404-Seite ausbauen: Link zur Startseite, ggf. Suchfeld oder Themenübersicht.

- Internationalisierung (i18n)
  - [x] Einheitliche Keys für Navigations-/Breadcrumb‑Labels konzipieren (z. B. NAV.HOME, NAV.CODE, NAV.JAVASCRIPT), behutsam migrieren.
  - [x] Fehlende/abweichende Übersetzungen prüfen (z. B. deutsche Begriffe als Schlüssel vs. neutrale Schlüssel).
  - [x] Initialsprache beim App-Start aus localStorage/Browser ermitteln (APP_INITIALIZER), Fallback sauber definieren.
  - [x] Title/Meta pro Route ebenfalls internationalisieren (TitleService + TranslateService).

- Barrierefreiheit (A11y)
  - [ ] Sichtbarer Tastaturfokus für alle interaktiven Elemente (Buttons, Links, Sprachumschalter).
  - [ ] Skip-Link („Zum Inhalt springen“) einführen.
  - [ ] aria-current für aktiven Menüpunkt/Breadcrumb setzen.
  - [x] Kontrast-Check (WCAG AA) für Farben; ggf. Alternativthema für hohen Kontrast.
  - [x] Codeblöcke: „Copy“-Button mit aussagekräftigem aria-label und Tastaturbedienbarkeit.

- Performance
  - [ ] Routen-Lazy-Loading prüfen/aktivieren, falls noch nicht überall genutzt.
  - [ ] PreloadStrategy für häufig besuchte Routen konfigurieren.
  - [ ] Bilder optimieren (Logo/Assets, responsive sizes), ggf. modernere Formate (WebP/AVIF) bereitstellen.
  - [ ] Font Awesome: Bündel minimieren (nur benötigte Icons laden) oder alternative Icon-Strategie.
  - [ ] Angular build budgets in angular.json schärfen und regelmäßig überwachen.

- SEO & Meta
  - [x] Dynamische Title- und Meta-Descriptions pro Route (inkl. Sprache).
  - [x] robots.txt und sitemap.xml erzeugen; Canonical-URLs setzen.
  - [x] hreflang-Tags für DE/EN ausliefern.
  - [x] Strukturierte Daten (JSON-LD), z. B. Person (Homepage) und BreadcrumbList.

- UI/Design & Responsiveness
  - [ ] Mobile Navigation (Burger-Menü) fertigstellen und zugänglich machen; Header-Verhalten < 768px verfeinern.
  - [ ] Dark Mode (prefers-color-scheme) und manuelle Umschaltung berücksichtigen.
  - [ ] Typografische Skala, Lesbarkeit (Zeilenlänge/Zeilenhöhe) konsistent abstimmen.

- Testing & Code-Quality
  - [x] Unit-Tests für Breadcrumb-Berechnung und Sprachumschalter (Persistenz, Events, aria-Attribute) erweitern; aktuelle Abdeckung: 96,86% Statements (Ziel: ≥ 80% für Kernkomponenten erreicht).
  - [x] Jest als Test-Runner eingerichtet mit TypeScript-Support und Coverage-Reports (lcov, text).
  - [x] Linting-Regeln (ESLint 8 + TypeScript-ESLint 8) mit Angular-spezifischen Regeln und Prettier-Integration.
  - [x] Playwright E2E-Tests für Kernpfade (Navigation, Sprachwechsel, 404) mit GitHub Actions CI-Integration.
  - [ ] Test-Performance optimieren: Highlight.js-Mocks für Unit-Tests implementieren (reduziert Console-Warnings).
  - [ ] Mutation Testing mit Stryker.js einführen für Qualitätsbewertung der Test-Suite.
  - [ ] Visual Regression Tests für kritische UI-Komponenten (Chromatic/Percy) evaluieren.
  - [ ] Bundle-Analyzer und Lighthouse CI in Pipeline integrieren für Performance-Monitoring.
  - [ ] TypeScript strict-Modus aktivieren und schrittweise Code-Qualität erhöhen.
  - [ ] SonarQube/SonarCloud für Code-Quality-Metriken und Security-Scans konfigurieren.

- Build/Deploy & Automatisierung
  - [x] GitHub Actions (CI) mit Lint, Build und Test.
  - [x] Conventional Commits per commitlint + husky erzwingen.
  - [x] Dependency-Updates automatisieren (Dependabot/Renovate).

- PWA & Offline
  - [ ] Web App Manifest und Icons ergänzen; ng add @angular/pwa prüfen.
  - [ ] Service Worker für Caching-Strategien (statische Assets, i18n-Dateien) evaluieren.

- Datenschutz & Rechtliches
  - [ ] Impressum und Datenschutzseite (DE/EN) anlegen und im Footer verlinken.
  - [ ] Externe Links mit rel="noopener noreferrer" prüfen.
  - [ ] Analytics nur mit Consent-Banner integrieren (sofern benötigt), IP-Anonymisierung sicherstellen.

- Fehlertoleranz & UX
  - [ ] Globale Fehler-/Loading-Zustände (Spinner/Skeleton) einführen.
  - [ ] Fallbacks bei fehlenden Übersetzungen sichtbar machen (Debug-Option im Dev-Modus).

- Dokumentation
  - [ ] README aktualisieren (i18n-Policy, How-to für neue Seiten/Keys, Dev-Setup).
  - [ ] CONTRIBUTING.md mit Konventionen (Commits, Branching, Code-Stil) erstellen.
