# TODO / Backlog für tomatenstau.de

Sammlung sinnvoller Verbesserungen und offener Punkte für die Weiterentwicklung der Seite. Die Liste ist priorisierbar und soll als lebendes Dokument dienen.

- Inhalt & Struktur
  - [ ] Startseite: Teaser-Abschnitte mit „Mehr erfahren“-Links strukturieren (Hero → Highlights → ausgewählte Code-Themen).
  - [ ] Code-Bereiche: Einleitungstexte vereinheitlichen, Beispiele mit kurzen Erklärungen einleiten und Querverweise zwischen Sprachen ergänzen.
  - [ ] Breadcrumb/Navigation: Einheitliche Schreibweise und ggf. neutrales Key-Schema für Navigationslabels (z. B. NAV.*) vorbereiten, ohne bestehende Routen zu brechen.
  - [x] 404-Seite ausbauen: Link zur Startseite, ggf. Suchfeld oder Themenübersicht.

- Internationalisierung (i18n)
  - [ ] Einheitliche Keys für Navigations-/Breadcrumb‑Labels konzipieren (z. B. NAV.HOME, NAV.CODE, NAV.JAVASCRIPT), behutsam migrieren.
  - [ ] Fehlende/abweichende Übersetzungen prüfen (z. B. deutsche Begriffe als Schlüssel vs. neutrale Schlüssel).
  - [ ] Initialsprache beim App-Start aus localStorage/Browser ermitteln (APP_INITIALIZER), Fallback sauber definieren.
  - [ ] Title/Meta pro Route ebenfalls internationalisieren (TitleService + TranslateService).

- Barrierefreiheit (A11y)
  - [ ] Sichtbarer Tastaturfokus für alle interaktiven Elemente (Buttons, Links, Sprachumschalter).
  - [ ] Skip-Link („Zum Inhalt springen“) einführen.
  - [ ] aria-current für aktiven Menüpunkt/Breadcrumb setzen.
  - [ ] Kontrast-Check (WCAG AA) für Farben; ggf. Alternativthema für hohen Kontrast.
  - [ ] Codeblöcke: „Copy“-Button mit aussagekräftigem aria-label und Tastaturbedienbarkeit.

- Performance
  - [ ] Routen-Lazy-Loading prüfen/aktivieren, falls noch nicht überall genutzt.
  - [ ] PreloadStrategy für häufig besuchte Routen konfigurieren.
  - [ ] Bilder optimieren (Logo/Assets, responsive sizes), ggf. modernere Formate (WebP/AVIF) bereitstellen.
  - [ ] Font Awesome: Bündel minimieren (nur benötigte Icons laden) oder alternative Icon-Strategie.
  - [ ] Angular build budgets in angular.json schärfen und regelmäßig überwachen.

- SEO & Meta
  - [ ] Dynamische Title- und Meta-Descriptions pro Route (inkl. Sprache).
  - [ ] robots.txt und sitemap.xml erzeugen; Canonical-URLs setzen.
  - [ ] hreflang-Tags für DE/EN ausliefern.
  - [ ] Strukturierte Daten (JSON-LD), z. B. Person (Homepage) und BreadcrumbList.

- UI/Design & Responsiveness
  - [ ] Mobile Navigation (Burger-Menü) fertigstellen und zugänglich machen; Header-Verhalten < 768px verfeinern.
  - [ ] Dark Mode (prefers-color-scheme) und manuelle Umschaltung berücksichtigen.
  - [ ] Typografische Skala, Lesbarkeit (Zeilenlänge/Zeilenhöhe) konsistent abstimmen.

- Testing & Code-Quality
  - [ ] Unit-Tests für Breadcrumb-Berechnung und Sprachumschalter (Persistenz, Events, aria-Attribute).
  - [ ] Linting-Regeln (eslint) prüfen/erweitern; Prettier-Setup vereinheitlichen.
  - [ ] E2E-Tests (Playwright/Cypress) für Kernpfade (Startseite → Code → Unterseiten, Sprachwechsel, 404).

- Build/Deploy & Automatisierung
  - [ ] GitHub Actions (CI) mit Lint, Build und Test.
  - [ ] Conventional Commits per commitlint + husky erzwingen.
  - [ ] Dependency-Updates automatisieren (Dependabot/Renovate).

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
